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
    EDITOR_TO_SELECTION_SET.delete(editor);
    EDITOR_TO_SELECTION.delete(editor);

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
      Path.equals(fromPath, toPath) ||
      !hasCommonTable(editor, fromPath, toPath)
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

    const selectedSet = new WeakSet<Element>();
    const selected: NodeEntry<Element>[][] = [];

    // if fromIdx is less than toIdx
    const minIdx = Math.min(fromIdx, toIdx);
    const maxIdx = Math.max(fromIdx, toIdx);

    for (const row of rows) {
      const cells: NodeEntry<Element>[] = [];
      for (let i = minIdx; i <= maxIdx; i++) {
        const [element] = row[i];
        selectedSet.add(element);
        cells.push(row[i]);
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
