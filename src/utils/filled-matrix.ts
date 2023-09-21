import { Editor, Location } from "slate";
import { matrix as matrixGenerator } from "./matrix";
import { colLength } from "../selection/with-selection";
import { NodeEntryWithContext } from "./types";

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

  return filled;
}
