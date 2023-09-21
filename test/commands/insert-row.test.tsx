/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { TableEditor } from "../../src/table-editor";
import { jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";

describe("insertRow", () => {
  it("should insert a row above the current selection", () => {
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
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

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertRow(editor, { above: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should insert a row below the current selection", () => {
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
            <tr>
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

    TableEditor.insertRow(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should insert a row at a specified location", () => {
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
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
            {/* should be added here  */}
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
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
            <tr>
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

    TableEditor.insertRow(editor, { at: [0, 1, 1] });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should insert a row with header-cells when inside thead", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text />
                  <cursor />
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph />
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
                  <cursor />
                </paragraph>
              </th>
            </tr>
            <tr>
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
                <paragraph />
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertRow(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should insert a row with td when inside tfoot", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text />
                  <cursor />
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
          <tbody>
            <tr>
              <td>
                <paragraph />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text />
                  <cursor />
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertRow(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |      | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * |   | 5 |   |  =>  |   | 5 |   |
   * + 4 +---+ 6 +      +   +---+   +
   * |   | 7*|   |      | 4 | X | 6 |
   * +---+---+---+      +   +---+   +
   * | 8 | 9 | 0 |      |   | 7*|   |
   * +---+---+---+      +---+---+---+
   *                    | 8 | 9 | 0 |
   *                    +---+---+---+
   */
  it("should insert a row above the selection and increase the rowspan of cells if necessary", () => {
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
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>
                    7<cursor />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
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
            </tr>
          </tfoot>
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
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={3}>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td rowSpan={3}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>
                    7<cursor />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
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
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertRow(editor, { above: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |      | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * |   | 5*|   |  =>  |   | 5*|   |
   * + 4 +---+ 6 +      +   +---+   +
   * |   | 7 |   |      | 4 | X | 6 |
   * +---+---+---+      +   +---+   +
   * | 8 | 9 | 0 |      |   | 7 |   |
   * +---+---+---+      +---+---+---+
   *                    | 8 | 9 | 0 |
   *                    +---+---+---+
   */
  it("should insert a row below the selection and increase the rowspan of cells if necessary", () => {
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
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    5<cursor />
                  </text>
                </paragraph>
              </td>
              <td rowSpan={2}>
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
          </tbody>
          <tfoot>
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
            </tr>
          </tfoot>
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
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={3}>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    5<cursor />
                  </text>
                </paragraph>
              </td>
              <td rowSpan={3}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text />
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
          </tbody>
          <tfoot>
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
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertRow(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |      | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * |   | 5*|   |  =>  | X | X | X |
   * + 4 +---+ 6 +      +---+---+---+
   * |   | 7 |   |      |   | 5*|   |
   * +---+---+---+      + 4 +---+ 6 +
   * | 8 | 9 | 0 |      |   | 7 |   |
   * +---+---+---+      +---+---+---+
   *                    | 8 | 9 | 0 |
   *                    +---+---+---+
   */
  test("that inserting a row above cells with rowspan does not increase their rowspan", () => {
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
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    5<cursor />
                  </text>
                </paragraph>
              </td>
              <td rowSpan={2}>
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
          </tbody>
          <tfoot>
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
            </tr>
          </tfoot>
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
              <td>
                <paragraph>
                  <text>2</text>
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
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    5<cursor />
                  </text>
                </paragraph>
              </td>
              <td rowSpan={2}>
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
          </tbody>
          <tfoot>
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
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertRow(editor, { above: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |      | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * |   | 5 |   |  =>  |   | 5 |   |
   * + 4 +---+ 6 +      + 4 +---+ 6 +
   * |   | 7*|   |      |   | 7*|   |
   * +---+---+---+      +---+---+---+
   * | 8 | 9 | 0 |      | X | X | X |
   * +---+---+---+      +---+---+---+
   *                    | 8 | 9 | 0 |
   *                    +---+---+---+
   */
  test("that inserting a row below cells with rowspan does not increase their rowspan", () => {
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
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>
                    7<cursor />
                  </text>
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
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>
                    7<cursor />
                  </text>
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
                  <text />
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
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertRow(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |      | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * |   | 5 |   |  =>  | X | X | X |
   * + 4*+---+ 6 +      +---+---+---+
   * |   | 7 |   |      |   | 5 |   |
   * +---+---+---+      + 4 +---+ 6 +
   * | 8 | 9 | 0 |      |   | 7 |   |
   * +---+---+---+      +---+---+---+
   *                    | 8 | 9 | 0 |
   *                    +---+---+---+
   */
  test("that inserting a row above a cell with a rowspan does not increase their rowspan", () => {
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
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>
                    4<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
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
              <td>
                <paragraph>
                  <text>2</text>
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
                  <text />
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>
                    4<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
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
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertRow(editor, { above: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |      | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * |   | 5 |   |  =>  |   | 5 |   |
   * + 4*+---+ 6 +      + 4*+---+ 6 +
   * |   | 7 |   |      |   | 7 |   |
   * +---+---+---+      +---+---+---+
   * | 8 | 9 | 0 |      | X | X | X |
   * +---+---+---+      +---+---+---+
   *                    | 8 | 9 | 0 |
   *                    +---+---+---+
   */
  test("that inserting a row below a cell with a rowspan does not increase their rowspan", () => {
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
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>
                    4<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
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
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>
                    4<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
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
                  <text />
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
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertRow(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   *                    +---+---+---+
   *                    | X | X | X |
   * +---+---+---+      +---+---+---+
   * |   | 2 | 3 |      |   | 2 | 3 |
   * + 1 +---+---+      + 1 +---+---+
   * |   | 4 | 5 |  =>  |   | 4 | 5 |
   * +---+---+---+      +---+---+---+
   * | 6 | 7 | 8 |      | 6 | 7 | 8 |
   * +---+---+---+      +---+---+---+
   */
  test("that inserting a row at the top of the table does not increase rowspan", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td rowSpan={2}>
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
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>6</text>
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
            <tr>
              <td rowSpan={2}>
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
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>6</text>
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
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertRow(editor, { above: true });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |      | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * |   | 5 | 6 |  =>  |   | 5 | 6 |
   * + 4 +---+---+      + 4 +---+---+
   * |   | 7 | 8 |      |   | 7 | 8 |
   * +---+---+---+      +---+---+---+
   *                    | X | X | X |
   *                    +---+---+---+
   */
  test("that inserting a row at the bottom of the table does not increase rowspan", () => {
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
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
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
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>
                    7<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
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
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
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
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>
                    7<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>8</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text></text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text></text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text></text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.insertRow(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
