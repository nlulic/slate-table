import { Editor, NodeEntry, Path, Transforms, Range, Point, Node } from "slate";
import { isOfType, matrix } from "./utils";

export const TableCursor = {
  /**
   * Moves the cursor to the cell above the current cell in the table.
   */
  above(editor: Editor, event: PreventableEvent): void {
    const { selection } = editor;

    if (!selection || !Range.isCollapsed(selection)) {
      return;
    }

    const [table, selectedCell] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "th", "td"),
    });

    if (!table || !selectedCell) {
      return;
    }

    const [, tablePath] = table;
    const [, selectedCellPath] = selectedCell;

    if (
      !Path.equals(
        selection.anchor.path,
        Editor.start(editor, selectedCellPath).path
      )
    ) {
      return;
    }

    let prev: NodeEntry[] | undefined;
    let index = 0;
    row: for (const cells of matrix(editor, { at: selectedCellPath })) {
      for (index = 0; index < cells.length; index++) {
        const [, path] = cells[index];
        if (Path.equals(path, selectedCellPath)) {
          break row;
        }
      }
      prev = cells;
    }

    const targetCell = prev?.[index];

    if (!targetCell) {
      if (Path.hasPrevious(tablePath)) {
        event.preventDefault();
        Transforms.select(editor, Editor.end(editor, Path.previous(tablePath)));
      }
      return;
    }

    const [, targetCellPath] = targetCell;
    event.preventDefault();
    Transforms.select(editor, Editor.end(editor, targetCellPath));
  },
  /**
   * Moves the cursor to the cell below the current cell in the table.
   */
  below(editor: Editor, event: PreventableEvent): void {
    const { selection } = editor;

    if (!selection || !Range.isCollapsed(selection)) {
      return;
    }

    const [table, selectedCell] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "th", "td"),
    });

    if (!table || !selectedCell) {
      return;
    }

    const [, tablePath] = table;
    const [, selectedCellPath] = selectedCell;

    if (
      !Path.equals(
        selection.anchor.path,
        Editor.end(editor, selectedCellPath).path
      )
    ) {
      return;
    }

    const matrixGenerator = matrix(editor, { at: selectedCellPath });

    let next: NodeEntry[] | undefined;
    let index = 0;
    row: for (const cells of matrixGenerator) {
      for (index = 0; index < cells.length; index++) {
        const [, path] = cells[index];
        if (Path.equals(path, selectedCellPath)) {
          next = matrixGenerator.next().value;
          break row;
        }
      }
    }

    const targetCell = next?.[index];

    if (!targetCell) {
      if (Node.has(editor, Path.next(tablePath))) {
        event.preventDefault();
        Transforms.select(editor, Editor.end(editor, Path.next(tablePath)));
      }
      return;
    }

    const [, targetCellPath] = targetCell;
    event.preventDefault();
    Transforms.select(editor, Editor.end(editor, targetCellPath));
  },
  /**
   * Moves the cursor to the next cell in the table.
   */
  next(editor: Editor, event: PreventableEvent): void {
    const { selection } = editor;

    if (!selection || !Range.isCollapsed(selection)) {
      return;
    }

    const [table, selectedCell] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "th", "td"),
    });

    if (!table || !selectedCell) {
      return;
    }

    const [, tablePath] = table;
    const [, selectedCellPath] = selectedCell;

    if (!Point.equals(selection.anchor, Editor.end(editor, selectedCellPath))) {
      return;
    }

    const matrixGenerator = matrix(editor, { at: selectedCellPath });

    let current: NodeEntry[] | undefined, next: NodeEntry[] | undefined;
    let index = 0;
    row: for (const cells of matrixGenerator) {
      current = cells;
      for (index = 0; index < cells.length; index++) {
        const [, path] = cells[index];
        if (Path.equals(path, selectedCellPath)) {
          next = matrixGenerator.next().value;
          break row;
        }
      }
    }

    const targetCell = current?.[index + 1] || next?.[0];

    if (!targetCell) {
      if (Node.has(editor, Path.next(tablePath))) {
        event.preventDefault();
        Transforms.select(editor, Editor.end(editor, Path.next(tablePath)));
      }
      return;
    }

    const [, targetCellPath] = targetCell;
    event.preventDefault();
    Transforms.select(editor, Editor.end(editor, targetCellPath));
  },
  /**
   * Moves the cursor to the previous cell in the table.
   */
  previous(editor: Editor, event: PreventableEvent): void {
    const { selection } = editor;

    if (!selection || !Range.isCollapsed(selection)) {
      return;
    }

    const [table, selectedCell] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "th", "td"),
    });

    if (!table || !selectedCell) {
      return;
    }

    const [, tablePath] = table;
    const [, selectedCellPath] = selectedCell;

    if (
      !Point.equals(selection.anchor, Editor.start(editor, selectedCellPath))
    ) {
      return;
    }

    let prev: NodeEntry[] | undefined, current: NodeEntry[] | undefined;
    let index = 0;
    row: for (const cells of matrix(editor, { at: selectedCellPath })) {
      prev = current;
      current = cells;
      for (index = 0; index < cells.length; index++) {
        const [, path] = cells[index];
        if (Path.equals(path, selectedCellPath)) {
          break row;
        }
      }
    }

    const targetCell = current?.[index - 1] || prev?.[prev.length - 1];

    if (!targetCell) {
      // select the element above the table if the cell does not exist
      if (Path.hasPrevious(tablePath)) {
        event.preventDefault();
        Transforms.select(editor, Editor.end(editor, Path.previous(tablePath)));
      }
      return;
    }

    const [, targetCellPath] = targetCell;
    event.preventDefault();
    Transforms.select(editor, Editor.end(editor, targetCellPath));
  },
};

interface PreventableEvent {
  preventDefault(): void;
}
