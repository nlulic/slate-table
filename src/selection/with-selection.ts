import { EDITOR_TO_TABLE_SELECTION } from "../weak-maps";
import {
  Editor,
  Element,
  Node,
  NodeEntry,
  Operation,
  Path,
  Range,
} from "slate";
import { WithTableOptions } from "../options";
import { isOfType, matrix } from "../utils";

export const withSelection = <T extends Editor>(
  editor: T,
  { withSelection }: WithTableOptions
) => {
  if (!withSelection) {
    return editor;
  }

  const { apply } = editor;

  editor.apply = (op: Operation): void => {
    EDITOR_TO_TABLE_SELECTION.delete(editor); // TODO: test

    if (!Operation.isSelectionOperation(op)) {
      return apply(op);
    }

    const selection = {
      ...editor.selection,
      ...op.newProperties,
    };

    if (!Range.isRange(selection)) {
      return apply(op);
    }

    const [from] = Editor.nodes(editor, {
      match: isOfType(editor, "th", "td"),
      at: Range.start(selection),
    });

    const [to] = Editor.nodes(editor, {
      match: isOfType(editor, "th", "td"),
      at: Range.end(selection),
    });

    if (!from || !to) {
      return apply(op);
    }

    const [, fromPath] = from;
    const [, toPath] = to;

    if (
      Path.equals(fromPath, toPath) || // TODO: test
      !hasCommonTable(editor, fromPath, toPath) // TODO: test
    ) {
      return apply(op);
    }

    const [...rows] = matrix(editor, { at: [fromPath, toPath] });

    let fromIdx = 0;
    let toIdx = 0;
    for (const row of rows) {
      for (let i = 0; i < row.length; i++) {
        const [, path] = row[i];

        if (Path.equals(fromPath, path)) {
          fromIdx = i;
          continue;
        }

        if (Path.equals(toPath, path)) {
          toIdx = i;
          break;
        }
      }
    }

    const selected: NodeEntry<Element>[][] = [];
    for (const row of rows) {
      const cells: NodeEntry<Element>[] = [];
      for (let i = fromIdx; i <= toIdx; i++) {
        cells.push(row[i]);
      }
      selected.push(cells);
    }

    EDITOR_TO_TABLE_SELECTION.set(editor, selected);
    apply(op);
  };

  return editor;
};

/**
 * Retrieves the common table element of two paths. If the paths are not in a
 * common table it will return `undefined`
 */
function hasCommonTable(editor: Editor, path: Path, another: Path): boolean {
  const [commonNode, commonPath] = Node.common(editor, path, another);

  if (isOfType(editor, "table")(commonNode, commonPath)) {
    return true;
  }

  // Warning: returns the common ancestor but will return `undefined` if the
  // `commonPath` is equal to the table's path
  // TODO: write a test for this case
  return !!Editor.above(editor, {
    match: isOfType(editor, "table"),
    at: commonPath,
  });
}
