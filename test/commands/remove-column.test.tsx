/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_TEST_WITH_TABLE_OPTIONS, jsx, withTest } from "../testutils";
import { TableEditor } from "../../src/table-editor";
import { withTable } from "../../src/with-table";

describe("removeColumn", () => {
  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+
   * | 1 | 2*| 3 |  =>  | 1 |*3 |
   * +---+---+---+      +---+---+
   * | 4 | 5 | 6 |      | 4 | 6 |
   * +---+---+---+      +---+---+
   */
  it("should remove the middle column", () => {
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
            </tr>
          </thead>
          <tbody>
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
              <td>
                <paragraph>
                  <text>6</text>
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
                    <cursor />3
                  </text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+
   * | 1 | 2 | 3 |  =>  | 1 | 3 |
   * +---+---+---+      +---+---+
   * | 4 | 5 | 6 |      | 4 | 6 |
   * +---+---+---+      +---+---+
   */
  it("should remove at a specified location", () => {
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
            </tr>
          </thead>
          <tbody>
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
              <td>
                <paragraph>
                  <text>6</text>
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
                  <text>3</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor, { at: [0, 0, 0, 1, 0] });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+
   * | 1*| 2 |  =>  |*2 |
   * +---+---+      +---+
   * | 3 | 4 |      | 4 |
   * +---+---+      +---+
   */
  it("should remove start column", () => {
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
                    <cursor />2
                  </text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+
   * | 1 | 2*|  =>  | 1*|
   * +---+---+      +---+
   * | 3 | 4 |      | 3 |
   * +---+---+      +---+
   */
  it("should remove end column", () => {
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
                  <text>
                    1<cursor />
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
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:    Expected:
   * +---+
   * | 1*|  =>  EMPTY
   * +---+
   * | 2 |
   * +---+
   */
  it("should remove the table if it only contains one column", () => {
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const expected = <editor />;

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+
   * | 1 | 2*| 3 | 4 |  =>  | 1 |*3 | 4 |
   * +---+---+---+---+      +---+---+---+
   * | 5 |     6     |      | 5 |   6   |
   * +---+---+---+---+      +---+---+---+
   * |   7   | 8 | 9 |      | 7 | 8 | 9 |
   * +---+---+---+---+      +---+---+---+
   */
  it("should remove column with colspan and decrease it", () => {
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
                    <cursor />3
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
              <td colSpan={2}>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={1}>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+
   * | 1 | 2*| 3 |  =>  | 1 |*3 |
   * +---+---+---+      +---+---+
   * | 4 |   | 6 |      | 4 | 6 |
   * +---+ 5 +---+      +---+---+
   * | 7 |   | 8 |      | 7 | 8 |
   * +---+---+---+      +---+---+
   */
  it("should remove column with rowspan", () => {
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
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
                    <cursor />3
                  </text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+
   * | 1 |   | 3 |  =>  | 1 |*3 |
   * +---+   +---+      +---+---+
   * | 4 | 2*| 5 |      | 4 | 5 |
   * +---+   +---+      +---+---+
   * | 6 |   | 7 |      | 6 | 7 |
   * +---+---+---+      +---+---+
   */
  it("should remove column with rowspan spanning the whole table", () => {
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
                  <text>
                    <cursor />3
                  </text>
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
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+
   * | 1 |   |  =>  | 1*|
   * +---+   +      +---+
   * | 3 | 2*|      | 3 |
   * +---+   +      +---+
   * | 4 |   |      | 4 |
   * +---+---+      +---+
   */
  it("should remove column at end with rowspan spanning the whole table", () => {
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
                  <text>
                    1<cursor />
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+
   * |   | 2 |  =>  | 2 |
   * +   +---+      +---+
   * | 1*| 3 |      | 3 |
   * +   +---+      +---+
   * |   | 4 |      | 4 |
   * +---+---+      +---+
   */
  it("should remove column at start with rowspan spanning the whole table", () => {
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
                  <text>
                    <cursor />2
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+
   * | 1*|   |  =>  | 2 |
   * +---+ 2 +      +---+
   * | 3 |   |
   * +---+---+
   * Due to the rowspan covering the second row and the second row only
   * containing the cell being deleted, it should delete the second tr.
   */
  it("should remove column at start with rowspan on the sibling cell", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    1<cursor />
                  </text>
                </paragraph>
              </td>
              <td rowSpan={2}>
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
          </tbody>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td rowSpan={1}>
                <paragraph>
                  <text>
                    <cursor />2
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+---+      +---+---+
   * | 1*|   |   |  =>  | 2 |   |
   * +---+ 2 +   +      +---+ 3 +
   * | 4 |   | 3 |      | 6 |   |
   * +---+---+   +      +---+---+
   * | 5 | 6 |   |      | 8 | 9 |
   * +---+---+---+      +---+---+
   * | 7 | 8 | 9 |
   * +---+---+---+
   */
  it("should remove column column and decrease rowspan for cells spanning the tr being deleted", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    1<cursor />
                  </text>
                </paragraph>
              </td>
              <td rowSpan={2}>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td rowSpan={3}>
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
            </tr>
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
              <td rowSpan={1}>
                <paragraph>
                  <text>
                    <cursor />2
                  </text>
                </paragraph>
              </td>
              <td rowSpan={2}>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>6</text>
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
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+
   * | h | h |      | h |
   * +---+---+      +---+
   * | 1 |   |  =>  | 1*|
   * +---+   +      +---+
   * | 3 | 2*|      | 3 |
   * +---+   +      +---+
   * | 4 |   |      | 4 |
   * +---+---+      +---+
   */
  it("should remove column at end with rowspan when table has thead", () => {
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    1<cursor />
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+
   * | h | h |      | h |
   * +---+---+      +---+
   * |   | 2 |  =>  | 2 |
   * +   +---+      +---+
   * | 1*| 3 |      | 3 |
   * +   +---+      +---+
   * |   | 4 |      | 4 |
   * +---+---+      +---+
   */
  it("should remove column at start with rowspan when table has thead", () => {
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
                  <text>h</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    <cursor />2
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+
   * | h1| h2| h3| h4|  =>  | h1| h3| h4|
   * +---+---+---+---+      +---+---+---+
   * | 1 | 2 | 3 | 4 |      | 1 | 3 | 4 |
   * +---+---+---+---+      +---+---+---+
   * | 5 |           |      | 5 |       |
   * +---+     6*    +      +---+   6*  +
   * | 7 |           |      | 7 |       |
   * +---+---+---+---+      +---+---+---+
   * |   8   | 9 | 0 |      | 8 | 9 | 0 |
   * +---+---+---+---+      +---+---+---+
   */
  it("should remove column with rowspan and colspan", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>h1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h3</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h4</text>
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
                  <text>3</text>
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
                  <text>
                    6<cursor />
                  </text>
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
              <td colSpan={2}>
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
                  <text>h1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h3</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>h4</text>
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
                  <text>3</text>
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
              <td rowSpan={2} colSpan={2}>
                <paragraph>
                  <text>
                    6<cursor />
                  </text>
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
              <td colSpan={1}>
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

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+      +---+---+
   * | 1 | 2 | 3*|      | 1 | 2*|
   * +---+---+---+      +---+---+
   * | 4 |       |      | 4 |   |
   * +---+   5   +      +---+ 5 +
   * | 6 |       |      | 6 |   |
   * +---+---+---+      +---+---+
   * | 7 | 8 | 9 |      | 7 | 8 |
   * +---+---+---+      +---+---+
   */
  it("should remove column with rowspan and colspan from the end", () => {
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
                  <text>
                    3<cursor />
                  </text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td rowSpan={2} colSpan={2}>
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
                  <text>
                    2<cursor />
                  </text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td rowSpan={2} colSpan={1}>
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
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+
   * | 1 | 2 | 3 |      | 2 | 3 |
   * +---+---+---+      +---+---+
   * |       | 5 |      |   | 5 |
   * +   4*  +---+      + 4*+---+
   * |       | 6 |      |   | 6 |
   * +---+---+---+      +---+---+
   * | 7 | 8 | 9 |      | 8 | 9 |
   * +---+---+---+      +---+---+
   */
  it("should remove column with rowspan and colspan from the start", () => {
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
              <td rowSpan={2} colSpan={2}>
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
            </tr>
            <tr>
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
              <td rowSpan={2} colSpan={1}>
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
            </tr>
            <tr>
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

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+
   * |   | 2 |   |      |   |   |
   * + 1 +---+   +      + 1 +   +
   * |   | 4*| 3 |      |   | 3 |
   * +---+---+   +      +---+   +
   * | 5 | 6 |   |      |*5 |   |
   * +---+---+---+      +---+---+
   */
  it('should remove column when cell with selection has no "real" sibling', () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td rowSpan={3}>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>
                    4<cursor />
                  </text>
                </paragraph>
              </td>
            </tr>
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
              <td rowSpan={1}>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>
                    <cursor />5
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
