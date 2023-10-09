/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { TableEditor } from "../../src/table-editor";
import { jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";

describe("insertColumn", () => {
  it("should insert a column right of the current selection", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text />
                  <cursor />
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph />
              </th>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text />
                  <cursor />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should insert a column left to the current selection", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text />
                  <cursor />
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                  <cursor />
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { left: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should insert a column to the right at a specified location", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph />
              </th>
              <th>
                <paragraph />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text />
                  <cursor />
                </paragraph>
              </td>
              {/* should be added here  */}
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph />
              </th>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text />
                  <cursor />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { at: [0, 1, 0, 0] });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3 | 4 |  =>  | 1 | 2 | 3 | X | 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * |     5*    | 6 |      |     5     | X | 6 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 7 | 8 | 9 | 0 |      | 7 | 8 | 9 | X | 0 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert a column to the right correctly when the cell has colspan", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3}>
                <paragraph>
                  <text>
                    5<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>9</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>0</text>
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3}>
                <paragraph>
                  <text>
                    5<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>9</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>0</text>
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3 | 4 |  =>  | X | 1 | 2 | 3 | 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * |     5*    | 6 |      | X |     5     | 6 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 7 | 8 | 9 | 0 |      | X | 7 | 8 | 9 | 0 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert a column to the left correctly when the cell has colspan", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3}>
                <paragraph>
                  <text>
                    5<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>9</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>0</text>
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td colSpan={3}>
                <paragraph>
                  <text>
                    5<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>9</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>0</text>
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { left: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3 | 4 |  =>  | 1 | 2 | 3 | X | 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * |     5     | 6*|      |     5     | X | 6 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 7 | 8 | 9 | 0 |      | 7 | 8 | 9 | X | 0 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert a column to the left correctly when the cell to the left has colspan", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3}>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    6<cursor />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>9</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>0</text>
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3}>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    6<cursor />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>9</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>0</text>
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { left: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3 | 4 |  =>  | 1 | X | 2 | 3 | 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 5*|     6     |      | 5 | X |     6     |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 7 | 8 | 9 | 0 |      | 7 | X | 8 | 9 | 0 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert a column to the right correctly when the cell to the right has colspan", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    5<cursor />
                  </text>
                </paragraph>
              </td>
              <td colSpan={3}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>9</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>0</text>
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    5<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td colSpan={3}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>9</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>0</text>
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2*| 3 | 4 |  =>  | 1 | 2 | X | 3 | 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 5 |     6     |      | 5 |       6       |
   * +---+---+---+---+      +---+---+---+---+---+
   * |   7   | 8 | 9 |      |   7   | X | 8 | 9 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert a column to the right and correctly increase the colspan of cells", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>
                    2<cursor />
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td colSpan={3}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>9</text>
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>
                    2<cursor />
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td colSpan={4}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>9</text>
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
