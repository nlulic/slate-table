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
import { isOfType, matrix as matrixGenerator } from "../utils";
import { CellElement } from "../utils/types";
import { TableCursor } from "../table-cursor";

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

    const [...matrix] = matrixGenerator(editor, { at: fromPath });

    type NodeEntryWithContext = [
      NodeEntry<CellElement>,
      {
        rtl: number; // right-to-left (colspan)
        ltr: number; // left-to-right (colspan)
        ttb: number; // top-to-bottom (rowspan)
        btt: number; // bottom-to-top (rowspan)
      }
    ];

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
    let [fromRow, toRow, fromCol, toCol] = [0, 0, 0, 0];
    x: for (let x = 0; x < filled.length; x++) {
      for (let y = 0; y < filled[x].length; y++) {
        const [[, path]] = filled[x][y];

        if (Path.equals(fromPath, path)) {
          fromRow = x;
          fromCol = y;
        }

        if (Path.equals(toPath, path)) {
          toRow = x;
          toCol = y;
          break x;
        }
      }
    }

    let startRow = Math.min(fromRow, toRow);
    let endRow = Math.max(fromRow, toRow);

    let startCol = Math.min(fromCol, toCol);
    let endCol = Math.max(fromCol, toCol);

    // expand the selection based on rowspan and colspan
    for (;;) {
      let minX = startRow;
      let minY = startCol;
      let maxX = endRow;
      let maxY = endCol;

      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          const [, { rtl, ltr, btt, ttb }] = filled[x][y];

          minX = Math.min(minX, x - (ttb - 1));
          maxX = Math.max(maxX, x + (btt - 1));

          minY = Math.min(minY, y - (rtl - 1));
          maxY = Math.max(maxY, y + (ltr - 1));
        }
      }

      if (
        startRow === minX &&
        startCol === minY &&
        endRow === maxX &&
        endCol === maxY
      ) {
        break;
      }

      startRow = minX;
      startCol = minY;
      endRow = maxX;
      endCol = maxY;
    }

    const selectedSet = new WeakSet<Element>();
    const selected: NodeEntry<Element>[][] = [];

    for (let i = startRow; i <= endRow; i++) {
      const cells: NodeEntry<Element>[] = [];

      for (let j = startCol; j <= endCol; j++) {
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

function colLength(rows: NodeEntry<CellElement>[][]): number {
  let length = 0;

  for (const [{ colSpan = 1 }] of rows[0]) {
    length += colSpan;
  }

  return length;
}
