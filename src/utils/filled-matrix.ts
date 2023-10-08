import { CellElement, NodeEntryWithContext } from "./types";
import { Editor, Location, NodeEntry } from "slate";
import { matrix as matrixGenerator } from "./matrix";

// TODO: should replace the current `matrix` function
export function filledMatrix(
  editor: Editor,
  options: { at?: Location }
): NodeEntryWithContext[][] {
  const [...matrix] = matrixGenerator(editor, { at: options?.at });

  const rowLen = matrix.length;
  const colLen = colLength(matrix);

  const filled: NodeEntryWithContext[][] = Array.from({ length: rowLen });
  for (let i = 0; i < filled.length; i++) {
    filled[i] = Array.from({ length: colLen });
  }

  // fill matrix
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0, offset = 0; y < matrix[x].length; y++) {
      const [element] = matrix[x][y];
      const rowSpan = element.rowSpan || 1;
      const colSpan = element.colSpan || 1;

      for (let c = 0, occupied = 0; c < colSpan + occupied; c++) {
        if (filled[x][y + c + offset]) {
          occupied++;
          continue;
        }

        for (let r = 0; r < rowSpan; r++) {
          filled[x + r][y + c + offset] = [
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

      offset += colSpan - 1;
    }
  }

  return filled;
}

function colLength(rows: NodeEntry<CellElement>[][]): number {
  let length = 0;

  for (const [{ colSpan = 1 }] of rows[0]) {
    length += colSpan;
  }

  return length;
}
