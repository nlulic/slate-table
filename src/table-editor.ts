import { CellElement, WithType } from "./utils/types";
import { DEFAULT_INSERT_TABLE_OPTIONS, InsertTableOptions } from "./options";
import { EDITOR_TO_WITH_TABLE_OPTIONS } from "./weak-maps";
import {
  Editor,
  Element,
  Location,
  Node,
  NodeEntry,
  Path,
  Transforms,
} from "slate";
import { TableCursor } from "./table-cursor";
import { filledMatrix, isOfType } from "./utils";

export const TableEditor = {
  /**
   * Inserts a table at the specified location with the specified number of
   * rows. If no location is specified it will be inserted at the current
   * selection.
   * @param options The `rows` and `cols` specify the number of rows and
   * columns in the table, if not provided, they default to 2. The `at`
   * property can be used to optionally specifiy the location at which
   * to insert the table.
   * @returns void
   */
  insertTable(editor: Editor, options: Partial<InsertTableOptions> = {}): void {
    const editorOptions = EDITOR_TO_WITH_TABLE_OPTIONS.get(editor);

    if (!editorOptions) {
      return;
    }

    const {
      blocks: { content, table, tbody, td, tr },
    } = editorOptions;

    const { rows, cols, at } = { ...DEFAULT_INSERT_TABLE_OPTIONS, ...options };

    if (TableCursor.isInTable(editor, { at })) {
      return;
    }

    // number of rows and cols can't be less than 1
    const clamp = (n: number) => (n < 1 ? 1 : n);

    Transforms.insertNodes(
      editor,
      {
        type: table,
        children: [
          {
            type: tbody,
            children: Array.from({ length: clamp(rows) }).map<Node>(() => ({
              type: tr,
              children: Array.from({ length: clamp(cols) }).map<Node>(() => ({
                type: td,
                children: [
                  {
                    type: content,
                    children: [{ text: "" }],
                  },
                ],
              })),
            })),
          } as Node,
        ],
      } as Node,
      { at }
    );
  },
  /**
   * Removes a table at the specified location. If no location is specified
   * it will remove the table at the current selection.
   * @returns void
   */
  removeTable(editor: Editor, options: { at?: Location } = {}): void {
    const [table] = Editor.nodes(editor, {
      match: isOfType(editor, "table"),
      at: options.at,
    });

    if (!table) {
      return;
    }

    const [, path] = table;

    Transforms.removeNodes(editor, { at: path });
  },
  /**
   * Inserts a new row at the specified location. If no location
   * is specified it will insert the row at the current selection.
   * @param options The `at` specifies the location of the base row
   * on which the new row will be inserted. Depending on the `above`
   * property the row will be inserted above or below the base row.
   * @returns void
   */
  insertRow(
    editor: Editor,
    options: { at?: Location; above?: boolean } = {}
  ): void {
    const editorOptions = EDITOR_TO_WITH_TABLE_OPTIONS.get(editor);

    if (!editorOptions) {
      return;
    }

    const [table, currentSection, currentTr, currentTd] = Editor.nodes(editor, {
      match: isOfType(
        editor,
        "table", // current table
        "thead", // current section
        "tbody",
        "tfoot",
        "tr", // current row
        "td", // current cell
        "th"
      ),
      at: options.at,
    });

    if (!table || !currentSection || !currentTr || !currentTd) {
      return;
    }

    const matrix = filledMatrix(editor, { at: options.at });

    let trIndex = 0;
    outer: for (let x = 0; x < matrix.length; x++) {
      const [, currentTdPath] = currentTd;
      for (let y = 0; y < matrix[x].length; y++) {
        const [[, path], { btt }] = matrix[x][y];
        if (!Path.equals(currentTdPath, path)) {
          continue;
        }

        trIndex = x;

        // When determining the exit condition, we consider two scenarios:
        // 1. If a row will be added above the current selection, we seek the first match.
        // 2. Otherwise, if cells have a rowspan, we aim to find the last match.
        if (options.above || btt < 2) {
          break outer;
        }
      }
    }

    const [...tableRows] = Editor.nodes(editor, {
      match: isOfType(editor, "tr"),
      at: table[1],
    });

    Editor.withoutNormalizing(editor, () => {
      const destIndex = options.above ? trIndex - 1 : trIndex + 1;
      const isWithinBounds = destIndex >= 0 && destIndex < matrix.length;

      let increasedRowspan = 0;
      for (let y = 0; isWithinBounds && y < matrix[destIndex].length; y++) {
        const [[element, path], { ltr, ttb, btt }] = matrix[destIndex][y];
        const rowSpan = element.rowSpan || 1;

        if (options.above ? btt > 1 : ttb > 1) {
          increasedRowspan += ltr;

          Transforms.setNodes<CellElement>(
            editor,
            {
              rowSpan: rowSpan + 1,
            },
            { at: path }
          );
        }

        y += ltr - 1;
      }

      const { length: colLen } = isWithinBounds ? matrix[destIndex] : matrix[0];
      const { blocks } = editorOptions;

      const [, currentPath] = tableRows[trIndex];
      const [section] = currentSection;

      Transforms.insertNodes(
        editor,
        {
          type: blocks.tr,
          children: Array.from({ length: colLen - increasedRowspan }).map(
            () => ({
              type: section.type === blocks.thead ? blocks.th : blocks.td,
              children: [
                {
                  type: blocks.content,
                  children: [{ text: "" }],
                },
              ],
            })
          ),
        } as Node,
        {
          at: options.above ? currentPath : Path.next(currentPath),
        }
      );
    });
  },
  /**
   * Removes the row at the specified location. If no location is specified
   * it will remove the row at the current selection.
   * @returns void
   */
  removeRow(editor: Editor, options: { at?: Location } = {}) {
    const editorOptions = EDITOR_TO_WITH_TABLE_OPTIONS.get(editor);

    if (!editorOptions) {
      return;
    }

    const [table, section, tr, td] = Editor.nodes(editor, {
      match: isOfType(
        editor,
        "table", // table
        "thead", // section
        "tbody",
        "tfoot",
        "tr", // row
        "td", // cell
        "th"
      ),
      at: options.at,
    });

    if (!table || !section || !tr || !td) {
      return;
    }

    const [, tablePath] = table;
    const [, sectionPath] = section;
    const [, trPath] = tr;
    const [, tdPath] = td;

    // check if there is a sibling in the table
    const [, globalSibling] = Editor.nodes(editor, {
      match: isOfType(editor, "tr"),
      at: tablePath,
    });

    if (!globalSibling) {
      return Transforms.removeNodes(editor, {
        at: tablePath,
      });
    }

    const matrix = filledMatrix(editor, { at: options.at });

    let trIndex = 0;
    out: for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[x].length; y++) {
        const [[, path], { ltr: colSpan }] = matrix[x][y];

        if (Path.equals(tdPath, path)) {
          trIndex = x;
          break out;
        }

        y += colSpan - 1;
      }
    }

    // Flags whether the tr has a cell with a rowspan attribute (greater than 1).
    // If true, cells with a rowspan will be moved to the next tr.
    let hasRowspan = false;

    // cells which span over multiple rows and have to be reduced
    // when deleting the current tr
    const toReduce: NodeEntry<CellElement>[] = [];

    for (let i = 0; i < matrix[trIndex].length; i++) {
      const [entry, { ltr: colSpan, ttb, btt }] = matrix[trIndex][i];

      // checks if the cell marks the beginning of a rowspan.
      if (ttb === 1 && btt > 1) {
        hasRowspan = true;
      }

      // check if the cell has a rowspan greater 1, indicating
      // it spans multiple rows.
      if (ttb > 1 || btt > 1) {
        toReduce.push(entry);
      }

      i += colSpan - 1;
    }

    const toAdd: NodeEntry<CellElement>[] = [];
    const next = matrix[trIndex + 1];
    for (let i = 0; hasRowspan && i < next?.length; i++) {
      const [entry, { ltr: colSpan, ttb }] = next[i];

      // - If 1, it indicates the start of either a rowspan or a normal cell, and it can be carried over.
      // - If 2, it signifies the start of a rowspan in the previous cell and should be carried over.
      // - If greater than 2, the rowspan is above the current row and should not be carried over.
      if (ttb > 2) {
        continue;
      }

      toAdd.push(entry);

      i += colSpan - 1;
    }

    Editor.withoutNormalizing(editor, () => {
      for (const [{ rowSpan = 1 }, path] of toReduce) {
        Transforms.setNodes<CellElement>(
          editor,
          { rowSpan: rowSpan - 1 },
          { at: path }
        );
      }

      // If a cell of the tr contains the start of a rowspan
      // the cells will be merged with the next row
      if (hasRowspan) {
        const { blocks } = editorOptions;

        Transforms.mergeNodes(editor, {
          match: isOfType(editor, "tr"),
          at: Path.next(trPath),
        });

        Transforms.insertNodes(
          editor,
          {
            type: blocks.tr,
            children: toAdd.map((entry) => {
              const [element] = entry;

              if (toReduce.includes(entry)) {
                const { rowSpan = 1, ...rest } = element;

                return { ...rest, rowSpan: rowSpan === 1 ? 1 : rowSpan - 1 };
              }

              return element;
            }),
          } as Node,
          { at: Path.next(trPath) }
        );
      }

      // check if there is a sibling in the table section
      const [, sibling] = Editor.nodes(editor, {
        match: isOfType(editor, "tr"),
        at: sectionPath,
      });

      return Transforms.removeNodes(editor, {
        // removes table section if there is no sibling in it
        at: sibling ? trPath : sectionPath,
      });
    });
  },
  /**
   * Inserts a new column at the specified location. If no location
   * is specified it will insert the column at the current selection.
   * @returns void
   */
  insertColumn(
    editor: Editor,
    options: { at?: Location; left?: boolean } = {}
  ): void {
    const editorOptions = EDITOR_TO_WITH_TABLE_OPTIONS.get(editor);

    if (!editorOptions) {
      return;
    }

    const [table, td] = Editor.nodes(editor, {
      match: isOfType(
        editor,
        "table", // table
        "td", // cell
        "th"
      ),
    });

    if (!table || !td) {
      return;
    }

    const [, tdPath] = td;

    const matrix = filledMatrix(editor, { at: options.at });

    let tdIndex = 0;
    out: for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[x].length; y++) {
        const [[, path]] = matrix[x][y];

        if (Path.equals(tdPath, path)) {
          tdIndex = y;
          if (options.left) {
            break out;
          }
        }
      }
    }

    Editor.withoutNormalizing(editor, () => {
      const { blocks } = editorOptions;
      for (let x = 0; x < matrix.length; x++) {
        const [[{ colSpan = 1 }, path], { ltr, rtl }] = matrix[x][tdIndex];

        const shouldIncreaseColspan = options.left ? rtl > 1 : ltr > 1;
        if (shouldIncreaseColspan) {
          Transforms.setNodes<CellElement>(
            editor,
            { colSpan: colSpan + 1 },
            { at: path }
          );
          continue;
        }

        // a section should always be present in the table
        const [[section]] = Editor.nodes(editor, {
          match: isOfType(editor, "thead", "tbody", "tfoot"),
          at: path,
        });

        Transforms.insertNodes(
          editor,
          {
            type: section.type === blocks.thead ? blocks.th : blocks.td,
            children: [{ text: "" }],
          } as Node,
          { at: options.left ? path : Path.next(path) }
        );
      }
    });
  },
  /**
   * Removes the column at the specified location. If no location is specified
   * it will remove the column at the current selection.
   * @returns void
   */
  removeColumn(editor: Editor, options: { at?: Location } = {}): void {
    const [table, cell] = Editor.nodes(editor, {
      match: isOfType(editor, "table", "th", "td"),
      at: options.at,
    });

    if (!table || !cell) {
      return;
    }

    const [, tablePath] = table;

    const rows = Editor.nodes(editor, {
      match: isOfType(editor, "tr"),
      at: tablePath,
    });

    const [, targetCellPath] = cell;
    const [, sibling] = Node.children(editor, Path.parent(targetCellPath));

    // Remove table if it is the last column in the table
    if (!sibling) {
      return this.removeTable(editor, { at: options.at });
    }

    Editor.withoutNormalizing(editor, () => {
      for (const [, path] of rows) {
        const deletionPath: Path = [
          ...path,
          targetCellPath[targetCellPath.length - 1],
        ];

        Transforms.removeNodes(editor, { at: deletionPath });
      }
    });
  },
};
