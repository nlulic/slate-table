import { CellElement, NodeEntryWithContext } from "../utils/types";
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
import { Point, isOfType, matrix as matrixGenerator } from "../utils";
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

    const [...matrix] = matrixGenerator(editor, { at: fromPath });

    const rowLen = matrix.length;
    const colLen = colLength(matrix);

    const filled: NodeEntryWithContext[][] = Array.from({ length: rowLen });
    for (let i = 0; i < filled.length; i++) {
      filled[i] = Array.from({ length: colLen });
    }

    // fill matrix
    for (let x = 0; x < matrix.length; x++) {
      for (let y = 0, offsetX = 0; y < matrix[x].length; y++) {
        const [element] = matrix[x][y];
        const rowSpan = element.rowSpan || 1;
        const colSpan = element.colSpan || 1;

        for (let r = 0; r < rowSpan; r++) {
          for (let c = 0, occupied = 0; c < colSpan + occupied; c++) {
            if (filled[x + r][y + c + offsetX]) {
              occupied++;
              continue;
            }

            filled[x + r][y + c + offsetX] = [
              matrix[x][y], // entry
              {
                rtl: c - occupied + 1,
                ltr: colSpan - c + occupied,
                ttb: r + 1,
                btt: rowSpan - r,
              },
            ];
          }
        }
        offsetX += colSpan - 1;
      }
    }

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

// TODO: move to "filled matrix"
export function colLength(rows: NodeEntry<CellElement>[][]): number {
  let length = 0;

  for (const [{ colSpan = 1 }] of rows[0]) {
    length += colSpan;
  }

  return length;
}
