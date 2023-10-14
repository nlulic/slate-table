import { EDITOR_TO_SELECTION, EDITOR_TO_SELECTION_SET } from "../weak-maps";
import {
  Editor,
  Element,
  Node,
  NodeEntry,
  Operation,
  Path,
  Range,
} from "slate";
import { Point, filledMatrix, isOfType } from "../utils";
import { TableCursor } from "../table-cursor";
import { WithTableOptions } from "../options";

export const withSelection = <T extends Editor>(
  editor: T,
  { withSelection }: WithTableOptions
) => {
  if (!withSelection) {
    return editor;
  }

  const { apply } = editor;

  editor.apply = (op: Operation): void => {
    TableCursor.unselect(editor);

    if (!Operation.isSelectionOperation(op) || !op.newProperties) {
      return apply(op);
    }

    const selection = {
      ...editor.selection,
      ...op.newProperties,
    };

    if (!Range.isRange(selection)) {
      return apply(op);
    }

    const [fromEntry] = Editor.nodes(editor, {
      match: isOfType(editor, "th", "td"),
      at: Range.start(selection),
    });

    const [toEntry] = Editor.nodes(editor, {
      match: isOfType(editor, "th", "td"),
      at: Range.end(selection),
    });

    if (!fromEntry || !toEntry) {
      return apply(op);
    }

    const [, fromPath] = fromEntry;
    const [, toPath] = toEntry;

    if (
      Path.equals(fromPath, toPath) ||
      !hasCommonTable(editor, fromPath, toPath)
    ) {
      return apply(op);
    }

    const filled = filledMatrix(editor, { at: fromPath });
    // find initial bounds
    const from = Point.valueOf(0, 0);
    const to = Point.valueOf(0, 0);
    outer: for (let x = 0; x < filled.length; x++) {
      for (let y = 0; y < filled[x].length; y++) {
        const [[, path]] = filled[x][y];

        if (Path.equals(fromPath, path)) {
          from.x = x;
          from.y = y;
        }

        if (Path.equals(toPath, path)) {
          to.x = x;
          to.y = y;
          break outer;
        }
      }
    }

    let start = Point.valueOf(Math.min(from.x, to.x), Math.min(from.y, to.y));
    let end = Point.valueOf(Math.max(from.x, to.x), Math.max(from.y, to.y));

    // expand the selection based on rowspan and colspan
    for (;;) {
      const nextStart = Point.valueOf(start.x, start.y);
      const nextEnd = Point.valueOf(end.x, end.y);

      for (let x = nextStart.x; x <= nextEnd.x; x++) {
        for (let y = nextStart.y; y <= nextEnd.y; y++) {
          const [, { rtl, ltr, btt, ttb }] = filled[x][y];

          nextStart.x = Math.min(nextStart.x, x - (ttb - 1));
          nextStart.y = Math.min(nextStart.y, y - (rtl - 1));

          nextEnd.x = Math.max(nextEnd.x, x + (btt - 1));
          nextEnd.y = Math.max(nextEnd.y, y + (ltr - 1));
        }
      }

      if (Point.equals(start, nextStart) && Point.equals(end, nextEnd)) {
        break;
      }

      start = nextStart;
      end = nextEnd;
    }

    const selectedSet = new WeakSet<Element>();
    const selected: NodeEntry<Element>[][] = [];

    for (let i = start.x; i <= end.x; i++) {
      const cells: NodeEntry<Element>[] = [];

      for (let j = start.y; j <= end.y; j++) {
        const [entry, { ltr: colSpan }] = filled[i][j];
        const [element] = entry;

        // prevent duplicate's from the filled matrix
        if (selectedSet.has(element)) {
          continue;
        }

        selectedSet.add(element);
        cells.push(entry);

        j += colSpan - 1;
      }
      selected.push(cells);
    }

    EDITOR_TO_SELECTION_SET.set(editor, selectedSet);
    EDITOR_TO_SELECTION.set(editor, selected);

    apply(op);
  };

  return editor;
};

/** Determines whether two paths belong to the same table by checking if they share a common ancestor node of type table */
function hasCommonTable(editor: Editor, path: Path, another: Path): boolean {
  const [commonNode, commonPath] = Node.common(editor, path, another);
  if (isOfType(editor, "table")(commonNode, commonPath)) {
    return true;
  }

  // Warning: returns the common ancestor but will return `undefined` if the
  // `commonPath` is equal to the table's path
  return !!Editor.above(editor, {
    match: isOfType(editor, "table"),
    at: commonPath,
  });
}
