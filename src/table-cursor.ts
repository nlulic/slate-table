import {
  BasePoint,
  Editor,
  Element,
  Node,
  NodeEntry,
  Path,
  Point,
  Range,
  Transforms,
} from "slate";
import { isOfType, matrix } from "./utils";
import {
  EDITOR_TO_SELECTION,
  EDITOR_TO_SELECTION_SET,
  EDITOR_TO_WITH_TABLE_OPTIONS,
} from "./weak-maps";

export const TableCursor = {
  /**
   * Moves the cursor to the cell above the current selection.
   * @param {Edge} [options.edge] - When specified, the cursor will move to another cell only if the
   * selection is positioned at a specific "edge". If the "edge" is set to `top`, the cursor will only
   * move if the selection is at the first element of the cell's content.
   *
   * Possible values: `left`, `right`, `top`, `bottom`.
   * @returns void
   */
  above(
    editor: Editor,
    event: PreventableEvent,
    options: { edge?: Edge } = {}
  ): void {
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
      options.edge &&
      !isOnEdge(editor, selection.anchor, selectedCellPath, options.edge)
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
   * Moves the cursor to the cell below the current selection.
   * @param {Edge} [options.edge] - When specified, the cursor will move to another cell only if the
   * selection is positioned at a specific "edge". If the "edge" is set to `bottom`, the cursor will only
   * move if the selection is at the last element of the cell's content.
   *
   * Possible values: `left`, `right`, `top`, `bottom`.
   * @returns void
   */
  below(
    editor: Editor,
    event: PreventableEvent,
    options: { edge?: Edge } = {}
  ): void {
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
      options.edge &&
      !isOnEdge(editor, selection.anchor, selectedCellPath, options.edge)
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
   * Moves the cursor to the cell after the current selection.
   * @param {Edge} [options.edge] - When specified, the cursor will move to another cell only if the
   * selection is positioned at a specific "edge". If the "edge" is set to `right`, the cursor will only
   * move if the selection is at the end of the cell's content.
   *
   * Possible values: `left`, `right`, `top`, `bottom`.
   * @returns void
   */
  next(
    editor: Editor,
    event: PreventableEvent,
    options: { edge?: Edge } = {}
  ): void {
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
      options.edge &&
      !isOnEdge(editor, selection.anchor, selectedCellPath, options.edge)
    ) {
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
   * Moves the cursor to the cell before the current selection.
   * @param {Edge} [options.edge] - When specified, the cursor will move to another cell only if the
   * selection is positioned at a specific "edge". If the "edge" is set to `left`, the cursor will only
   * move if the selection is at the start of the cell's content.
   *
   * Possible values: `left`, `right`, `top`, `bottom`.
   * @returns void
   */
  previous(
    editor: Editor,
    event: PreventableEvent,
    options: { edge?: Edge } = {}
  ): void {
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
      options.edge &&
      !isOnEdge(editor, selection.anchor, selectedCellPath, options.edge)
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
  /**
   * Retrieves a matrix representing the selected cells within a table.
   * @returns {NodeEntry<T>[][]} A matrix containing the selected cells.
   */
  selection<T extends Element>(editor: Editor): NodeEntry<T>[][] {
    const editorOptions = EDITOR_TO_WITH_TABLE_OPTIONS.get(editor);
    if (!editorOptions?.withSelection) {
      throw new Error(
        "The `selection` command must be used with the `withSelection` option."
      );
    }

    const matrix = EDITOR_TO_SELECTION.get(editor);

    if (!matrix) {
      return [];
    }

    return matrix as NodeEntry<T>[][];
  },
  /**
   * Checks whether a given cell is part of the current table selection.
   * @returns {boolean} - Returns true if the cell is selected, otherwise false.
   */
  isSelected<T extends Element>(editor: Editor, element: T): boolean {
    const editorOptions = EDITOR_TO_WITH_TABLE_OPTIONS.get(editor);
    if (!editorOptions?.withSelection) {
      throw new Error(
        "The `isSelected` command must be used with the `withSelection` option."
      );
    }

    const selectedElements = EDITOR_TO_SELECTION_SET.get(editor);

    if (!selectedElements) {
      return false;
    }

    return selectedElements.has(element);
  },
};

interface PreventableEvent {
  preventDefault(): void;
}

type Edge = "left" | "right" | "top" | "bottom";

function isOnEdge(
  editor: Editor,
  point: BasePoint,
  nodePath: Path,
  edge: Edge
): boolean {
  switch (edge) {
    case "top":
      return Path.equals(point.path, Editor.start(editor, nodePath).path);
    case "bottom":
      return Path.equals(point.path, Editor.end(editor, nodePath).path);
    case "right":
      return Point.equals(point, Editor.end(editor, nodePath));
    case "left":
      return Point.equals(point, Editor.start(editor, nodePath));
    default:
      return false;
  }
}
