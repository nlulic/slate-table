/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_TEST_WITH_TABLE_OPTIONS, jsx, withTest } from "../testutils";
import { TableEditor } from "../../src/table-editor";
import { withTable } from "../../src/with-table";

describe("insertColumn", () => {
  /*
   * Actual:        Expected:
   * +---+---+      +---+---+---+
   * | 1*| 2 |  =>  | 1*| X | 2 |
   * +---+---+      +---+---+---+
   * | 3 | 4 |      | 3 | X | 4 |
   * +---+---+      +---+---+---+
   */
  it("should insert after the selection", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>
                    1<cursor />
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
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
                  <text>
                    1<cursor />
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
                  <text>2</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+---+---+
   * | 1 | 2*|  =>  | 1 | X | 2*|
   * +---+---+      +---+---+---+
   * | 3 | 4 |      | 3 | X | 4 |
   * +---+---+      +---+---+---+
   */
  it("should insert before the selection", () => {
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
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
                  <text>
                    2<cursor />
                  </text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { before: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+---+---+
   * | 1 | 2*|  =>  | 1 | 2*| X |
   * +---+---+      +---+---+---+
   * | 3 | 4 |      | 3 | 4 | X |
   * +---+---+      +---+---+---+
   */
  it("should insert after the specified location", () => {
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
              {/* should be added here  */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              {/* should be added here  */}
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
                  <text />
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { at: [0, 0, 0, 1] });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+---+---+
   * | 1 | 2*|  =>  | 1 | 2*| X |
   * +---+---+      +---+---+---+
   * | 3 | 4 |      | 3 | 4 | X |
   * +---+---+      +---+---+---+
   */
  it("should insert at the end", () => {
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+---+---+
   * | 1*| 2 |  =>  | X | 1*| 2 |
   * +---+---+      +---+---+---+
   * | 3 | 4 |      | X | 3 | 4 |
   * +---+---+      +---+---+---+
   */
  it("should insert at the start", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>
                    1<cursor />
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
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
                <paragraph>
                  <text>
                    1<cursor />
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
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
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { before: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3 | 4 |  =>  | 1 | 2 | 3 | X | 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * |     5*    | 6 |      |     5*    | X | 6 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 7 | 8 | 9 | 0 |      | 7 | 8 | 9 | X | 0 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert after the end of a colspan", () => {
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3 | 4 |  =>  | X | 1 | 2 | 3 | 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * |     5*    | 6 |      | X |     5*    | 6 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 7 | 8 | 9 | 0 |      | X | 7 | 8 | 9 | 0 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert before the start of a colspan", () => {
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { before: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3 | 4 |  =>  | 1 | X | 2 | 3 | 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 5*|     6     |      | 5*| X |     6     |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 7 | 8 | 9 | 0 |      | 7 | X | 8 | 9 | 0 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert after the selection when sibling has colspan", () => {
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3 | 4 |  =>  | 1 | 2 | 3 | X | 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * |     5     | 6*|      |     5     | X | 6*|
   * +---+---+---+---+      +---+---+---+---+---+
   * | 7 | 8 | 9 | 0 |      | 7 | 8 | 9 | X | 0 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert before the selection when sibling has colspan", () => {
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { before: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2*| 3 | 4 |  =>  | 1 | 2*| X | 3 | 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 5 |     6     |      | 5 |       6       |
   * +---+---+---+---+      +---+---+---+---+---+
   * |   7   | 8 | 9 |      |   7   | X | 8 | 9 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert after the selection when column has colspan and increase it", () => {
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3*| 4 |  =>  | 1 | 2 | X | 3*| 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 5 |     6     |      | 5 |       6       |
   * +---+---+---+---+      +---+---+---+---+---+
   * |   7   | 8 | 9 |      |   7   | X | 8 | 9 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert before the selection when column has colspan and increase it", () => {
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
                  <text>
                    3<cursor />
                  </text>
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
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>
                    3<cursor />
                  </text>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { before: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3*| 4 |  =>  | 1 | 2 | 3*| X | 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 5 | 6 |   | 8 |      | 5 | 6 |   | X | 8 |
   * +---+---+ 7 +---+      +---+---+ 7 +---+---+
   * |   9   |   | 0 |      |   9   |   | X | 0 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert after the selection when column has a rowspan", () => {
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
                  <text>
                    3<cursor />
                  </text>
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
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
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
                  <text>
                    3<cursor />
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
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
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
            </tr>
            <tr>
              <td colSpan={2}>
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
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3*| 4 |  =>  | 1 | 2 | X | 3*| 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 5 | 6 |   | 8 |      | 5 | 6 | X |   | 8 |
   * +---+---+ 7 +---+      +---+---+---+ 7 +---+
   * |   9   |   | 0 |      |   9   | X |   | 0 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert before the selection when column has a rowspan", () => {
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
                  <text>
                    3<cursor />
                  </text>
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
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
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
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>
                    3<cursor />
                  </text>
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
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td rowSpan={2}>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
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
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { before: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+---+---+
   * | 1 |   |  =>  | 1 |   | X |
   * +---+   +      +---+   +---+
   * | 3 | 2*|      | 3 | 2*| X |
   * +---+   +      +---+   +---+
   * | 4 |   |      | 4 |   | X |
   * +---+---+      +---+---+---+
   */
  it("should insert at the end when cell has rowspan", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td rowSpan={3}>
                <paragraph>
                  <text>
                    2<cursor />
                  </text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
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
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td rowSpan={3}>
                <paragraph>
                  <text>
                    2<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+---+---+
   * |   | 2 |  =>  | X |   | 2 |
   * +   +---+      +---+   +---+
   * | 1*| 3 |      | X | 1*| 3 |
   * +   +---+      +---+   +---+
   * |   | 4 |      | X |   | 4 |
   * +---+---+      +---+---+---+
   */
  it("should insert at the start when cell has rowspan", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td rowSpan={3}>
                <paragraph>
                  <text>
                    1<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
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
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td rowSpan={3}>
                <paragraph>
                  <text>
                    1<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { before: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+---+---+
   * | h | h |      | h | h | X |
   * +---+---+      +---+---+---+
   * | 1 |   |  =>  | 1 |   | X |
   * +---+   +      +---+   +---+
   * | 3 | 2*|      | 3 | 2*| X |
   * +---+   +      +---+   +---+
   * | 4 |   |      | 4 |   | X |
   * +---+---+      +---+---+---+
   */
  it("should insert at the end when cell has rowspan and thead", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td rowSpan={3}>
                <paragraph>
                  <text>
                    2<cursor />
                  </text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
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
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
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
                  <text>1</text>
                </paragraph>
              </td>
              <td rowSpan={3}>
                <paragraph>
                  <text>
                    2<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+---+---+
   * | h | h |      | X | h | h |
   * +---+---+      +---+---+---+
   * |   | 2 |  =>  | X |   | 2 |
   * +   +---+      +---+   +---+
   * | 1*| 3 |      | X | 1*| 3 |
   * +   +---+      +---+   +---+
   * |   | 4 |      | X |   | 4 |
   * +---+---+      +---+---+---+
   */
  it("should insert at the start when cell has rowspan and thead", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={3}>
                <paragraph>
                  <text>
                    1<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
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
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
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
              <td rowSpan={3}>
                <paragraph>
                  <text>
                    1<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { before: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | h | h | h | h |  =>  | h | h | h | X | h |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3*| 4 |  =>  | 1 | 2 | 3*| X | 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 5 |           |      | 5 |               |
   * +---+     6     +      +---+       6       +
   * | 7 |           |      | 7 |               |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 8 | 9 | 0 | 1 |      | 8 | 9 | 0 | X | 1 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert after the selection when column has rowspan and colspan and increase its colspan correctly", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    3<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td rowSpan={2} colSpan={3}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
            </tr>
            <tr>
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
              <td>
                <paragraph>
                  <text>1</text>
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
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    3<cursor />
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
                  <text>4</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td rowSpan={2} colSpan={4}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
            </tr>
            <tr>
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
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+---+
   * | h | h | h | h |  =>  | h | h | X | h | h |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 1 | 2 | 3*| 4 |  =>  | 1 | 2 | X | 3*| 4 |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 5 |           |      | 5 |               |
   * +---+     6     +      +---+       6       +
   * | 7 |           |      | 7 |               |
   * +---+---+---+---+      +---+---+---+---+---+
   * | 8 | 9 | 0 | 1 |      | 8 | 9 | X | 0 | 1 |
   * +---+---+---+---+      +---+---+---+---+---+
   */
  it("should insert before the selection when column has rowspan and colspan and increase its colspan correctly", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    3<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td rowSpan={2} colSpan={3}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
            </tr>
            <tr>
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
              <td>
                <paragraph>
                  <text>1</text>
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
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
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
                    3<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td rowSpan={2} colSpan={4}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
            </tr>
            <tr>
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
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.insertColumn(editor, { before: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
