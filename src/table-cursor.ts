import {
  Editor,
  Element,
  Location,
  Node,
  NodeEntry,
  Operation,
  Path,
  Point,
  Range,
  Transforms,
} from "slate";
import {
  EDITOR_TO_SELECTION,
  EDITOR_TO_SELECTION_SET,
  EDITOR_TO_WITH_TABLE_OPTIONS,
} from "./weak-maps";
import { NodeEntryWithContext, SelectionMode } from "./utils/types";
import { filledMatrix, isOfType, matrix } from "./utils";

export const TableCursor = {
  /** @returns `true` if the selection is inside a table, otherwise `false`. */
  isInTable(editor: Editor, options: { at?: Location } = {}): boolean {
    const [table] = Editor.nodes(editor, {
      match: isOfType(editor, "table"),
      at: options.at,
    });

    return !!table;
  },
  /**
   * Moves the cursor to the cell above the current selection.
   * @param {'start' | 'end' | 'all'} [options.mode] - Specifies the selection mode,
   * which can be one of the following: `start` to move the cursor to the beginning
   * of the cell's content, `end` to move it to the end, or `all` to extend the
   * selection over the entire cell's content.
   * @returns `true` if the action was successful, `false` otherwise.
   */
  above(editor: Editor, options: { mode?: SelectionMode } = {}): boolean {
    if (!editor.selection) {
      return false;
    }

    const [table, td] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "th", "td"),
    });

    if (!table || !td) {
      return false;
    }

    const [, tablePath] = table;
    const [, tdPath] = td;

    const m = filledMatrix(editor, { at: tablePath });

    let previous: NodeEntryWithContext[] | undefined;
    let indexY = 0;
    outer: for (let x = 0; x < m.length; x++) {
      for (indexY = 0; indexY < m[x].length; indexY++) {
        const [[, path], { ltr: colSpan }] = m[x][indexY];
        if (Path.equals(path, tdPath)) {
          break outer;
        }

        indexY += colSpan - 1;
      }
      previous = m[x];
    }

    if (!previous || !previous[indexY]) {
      if (Path.hasPrevious(tablePath)) {
        Transforms.select(editor, Editor.end(editor, Path.previous(tablePath)));
        return true;
      }

      return false;
    }

    const [[, path]] = previous[indexY];

    options.mode === "all"
      ? Transforms.select(editor, path)
      : Transforms.select(
          editor,
          options.mode === "start"
            ? Editor.start(editor, path)
            : Editor.end(editor, path)
        );

    return true;
  },
  /**
   * Moves the cursor to the cell below the current selection.
   * @param {'start' | 'end' | 'all'} [options.mode] - Specifies the selection mode,
   * which can be one of the following: `start` to move the cursor to the beginning
   * of the cell's content, `end` to move it to the end, or `all` to extend the
   * selection over the entire cell's content.
   * @returns `true` if the action was successful, `false` otherwise.
   */
  below(editor: Editor, options: { mode?: SelectionMode } = {}): boolean {
    if (!editor.selection) {
      return false;
    }

    const [table, td] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "th", "td"),
      at: Range.end(editor.selection),
    });

    if (!table || !td) {
      return false;
    }

    const [, tablePath] = table;
    const [, tdPath] = td;

    const m = filledMatrix(editor, { at: tablePath });

    let next: NodeEntryWithContext[] | undefined;
    let indexY = 0;
    outer: for (let x = 0; x < m.length; x++) {
      for (indexY = 0; indexY < m[x].length; indexY++) {
        const [[, path], { ltr: colSpan, btt: rowSpan }] = m[x][indexY];

        if (rowSpan === 1 && Path.equals(path, tdPath)) {
          next = m[x + 1];
          break outer;
        }

        indexY += colSpan - 1;
      }
    }

    if (!next || !next[indexY]) {
      if (Node.has(editor, Path.next(tablePath))) {
        Transforms.select(editor, Editor.end(editor, Path.next(tablePath)));
        return true;
      }

      return false;
    }

    const [[, path]] = next[indexY];

    options.mode === "all"
      ? Transforms.select(editor, path)
      : Transforms.select(
          editor,
          options.mode === "start"
            ? Editor.start(editor, path)
            : Editor.end(editor, path)
        );

    return true;
  },
  /**
   * Moves the cursor to the cell next to the current selection.
   * @param {'start' | 'end' | 'all'} [options.mode] - Specifies the selection mode,
   * which can be one of the following: `start` to move the cursor to the beginning
   * of the cell's content, `end` to move it to the end, or `all` to extend the
   * selection over the entire cell's content.
   * @returns `true` if the action was successful, `false` otherwise.
   */
  next(editor: Editor, options: { mode?: SelectionMode } = {}): boolean {
    if (!editor.selection) {
      return false;
    }

    const [table, td] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "th", "td"),
      at: Range.end(editor.selection),
    });

    if (!table || !td) {
      return false;
    }

    const [, tablePath] = table;
    const [, tdPath] = td;

    let foundTd = false;
    let nextPath: Path | undefined;
    outer: for (const tr of matrix(editor, { at: tablePath })) {
      for (const [, path] of tr) {
        if (!foundTd) {
          foundTd = Path.equals(path, tdPath);
          continue;
        }

        nextPath = path;
        break outer;
      }
    }

    if (!nextPath) {
      if (Node.has(editor, Path.next(tablePath))) {
        Transforms.select(editor, Editor.end(editor, Path.next(tablePath)));
        return true;
      }

      return false;
    }

    options.mode === "all"
      ? Transforms.select(editor, nextPath)
      : Transforms.select(
          editor,
          options.mode === "start"
            ? Editor.start(editor, nextPath)
            : Editor.end(editor, nextPath)
        );

    return true;
  },
  /**
   * Moves the cursor to the cell before the current selection.
   * @param {'start' | 'end' | 'all'} [options.mode] - Specifies the selection mode,
   * which can be one of the following: `start` to move the cursor to the beginning
   * of the cell's content, `end` to move it to the end, or `all` to extend the
   * selection over the entire cell's content.
   * @returns `true` if the action was successful, `false` otherwise.
   */
  previous(editor: Editor, options: { mode?: SelectionMode } = {}): boolean {
    if (!editor.selection) {
      return false;
    }

    const [table, td] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "th", "td"),
      at: Range.start(editor.selection),
    });

    if (!table || !td) {
      return false;
    }

    const [, tablePath] = table;
    const [, tdPath] = td;

    let foundTd = false;
    let previousPath: Path | undefined;
    outer: for (const tr of matrix(editor, { at: tablePath, reverse: true })) {
      for (const [, path] of tr) {
        if (!foundTd) {
          foundTd = Path.equals(path, tdPath);
          continue;
        }

        previousPath = path;
        break outer;
      }
    }

    if (!previousPath) {
      if (Path.hasPrevious(tablePath)) {
        Transforms.select(editor, Editor.end(editor, Path.previous(tablePath)));
        return true;
      }

      return false;
    }

    options.mode === "all"
      ? Transforms.select(editor, previousPath)
      : Transforms.select(
          editor,
          options.mode === "start"
            ? Editor.start(editor, previousPath)
            : Editor.end(editor, previousPath)
        );

    return true;
  },
  /**
   * Checks if the cursor is in the first cell of the table
   * @returns {boolean} `true` if the cursor is in the first cell, otherwise `false`.
   */
  isInFirstCell(editor: Editor): boolean {
    if (!editor.selection) {
      return false;
    }

    const [table, td] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "th", "td"),
    });

    if (!table || !td) {
      return false;
    }

    const [firstTd] = Editor.nodes(editor, {
      match: isOfType(editor, "th", "td"),
      at: table[1],
    });

    return !!firstTd && Path.equals(firstTd[1], td[1]);
  },
  /**
   * Checks if the cursor is in the last cell of the table
   * @returns {boolean} `true` if the cursor is in the last cell, otherwise `false`.
   */
  isInLastCell(editor: Editor): boolean {
    if (!editor.selection) {
      return false;
    }

    const [table, td] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "th", "td"),
      at: Range.end(editor.selection),
    });

    if (!table || !td) {
      return false;
    }

    const [lastTd] = Editor.nodes(editor, {
      match: isOfType(editor, "th", "td"),
      reverse: true,
      at: table[1],
    });

    return !!lastTd && Path.equals(lastTd[1], td[1]);
  },
  /**
   * Checks if the cursor is in the first row of the table
   * @returns {boolean} `true` if the cursor is in the first row, otherwise `false`.
   */
  isInFirstRow(editor: Editor): boolean {
    if (!editor.selection) {
      return false;
    }

    const [table, tr] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "tr"),
    });

    if (!table || !tr) {
      return false;
    }

    const [firstTr] = Editor.nodes(editor, {
      match: isOfType(editor, "tr"),
      at: table[1],
    });

    return !!firstTr && Path.equals(firstTr[1], tr[1]);
  },
  /**
   * Checks if the cursor is in the first row of the table
   * @returns {boolean} `true` if the cursor is in the first row, otherwise `false`.
   */
  isInLastRow(editor: Editor): boolean {
    if (!editor.selection) {
      return false;
    }

    const [table, tr] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "tr"),
      at: Range.end(editor.selection),
    });

    if (!table || !tr) {
      return false;
    }

    const [lastTr] = Editor.nodes(editor, {
      match: isOfType(editor, "tr"),
      reverse: true,
      at: table[1],
    });

    return !!lastTr && Path.equals(lastTr[1], tr[1]);
  },
  /**
   * Checks if the cursor is positioned at the beginning of the cell's content.
   * @returns {boolean} `true` if the cursor is at the left edge of the cell's content, `false` otherwise.
   */
  isOnLeftEdge(editor: Editor): boolean {
    const { selection } = editor;
    if (!selection) {
      return false;
    }

    const [td] = Editor.nodes(editor, {
      match: isOfType(editor, "th", "td"),
    });

    return td
      ? Point.equals(selection.anchor, Editor.start(editor, td[1]))
      : false;
  },
  /**
   * Checks if the cursor is positioned at the end of the cell's content.
   * @returns {boolean} `true` if the cursor is at the right edge of the cell's content, `false` otherwise.
   */
  isOnRightEdge(editor: Editor): boolean {
    const { selection } = editor;
    if (!selection) {
      return false;
    }

    const [td] = Editor.nodes(editor, {
      match: isOfType(editor, "th", "td"),
      at: Range.end(selection),
    });

    return td
      ? Point.equals(Range.end(selection), Editor.end(editor, td[1]))
      : false;
  },
  /**
   * Checks if the cursor is positioned at the first block of the cell's content.
   * @returns {boolean} `true` if the cursor is at the top edge of the cell's content, `false` otherwise.
   */
  isOnTopEdge(editor: Editor): boolean {
    const { selection } = editor;
    if (!selection) {
      return false;
    }

    const [td] = Editor.nodes(editor, {
      match: isOfType(editor, "th", "td"),
    });

    return td
      ? Path.equals(selection.anchor.path, Editor.start(editor, td[1]).path)
      : false;
  },
  /**
   * Checks if the cursor is positioned at the last block of the cell's content.
   * @returns {boolean} `true` if the cursor is at the bottom edge of the cell's content, `false` otherwise.
   */
  isOnBottomEdge(editor: Editor): boolean {
    const { selection } = editor;
    if (!selection) {
      return false;
    }

    const [td] = Editor.nodes(editor, {
      match: isOfType(editor, "th", "td"),
      at: Range.end(selection),
    });

    return td
      ? Path.equals(Range.end(selection).path, Editor.end(editor, td[1]).path)
      : false;
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
  /** Clears the selection from the table */
  unselect(editor: Editor): void {
    const editorOptions = EDITOR_TO_WITH_TABLE_OPTIONS.get(editor);
    if (!editorOptions?.withSelection) {
      throw new Error(
        "The `unselect` command must be used with the `withSelection` option."
      );
    }

    const matrix = EDITOR_TO_SELECTION.get(editor);

    if (!matrix?.length) {
      return;
    }

    // Hacky fix to trigger change detection on selected
    // cells by invoking a no-op on the paths
    for (const row of matrix) {
      for (const [, path] of row) {
        // no-op since the paths are the same
        const noop: Operation = {
          type: "move_node",
          newPath: path,
          path: path,
        };
        Transforms.transform(editor, noop);
      }
    }

    EDITOR_TO_SELECTION_SET.delete(editor);
    EDITOR_TO_SELECTION.delete(editor);
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
