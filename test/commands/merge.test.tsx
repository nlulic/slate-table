/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { TableEditor } from "../../src/table-editor";
import { jsx, withTest, DEFAULT_TEST_WITH_TABLE_OPTIONS } from "../testutils";
import { withTable } from "../../src/with-table";
import { Range, SelectionOperation } from "slate";

describe("merge", () => {
  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * |<1 | 2 | 3>|  =>  |<1         |
   * +---+---+---+      + 2         +
   * | 4 | 5 | 6 |      | 3>        |
   * +---+---+---+      +---+---+---+
   *                    | 4 | 5 | 6 |
   *                    +---+---+---+
   */
  it("should merge cells in the same row", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    <anchor />1
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
                  <text>
                    3<focus />
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
              <td rowSpan={1} colSpan={3}>
                <paragraph>
                  <text>
                    <anchor />1
                  </text>
                </paragraph>
                <paragraph>
                  <text>2</text>
                </paragraph>
                <paragraph>
                  <text>
                    3<focus />
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

    // apply selection by triggering a selection operation
    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    TableEditor.merge(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * |<1 | 2 | 3 |  =>  |<1         |
   * +---+---+---+      + …         +
   * | 4 | 5 | 6>|      | 6>        |
   * +---+---+---+      +---+---+---+
   * | 7 | 8 | 9 |      | 7 | 8 | 9 |
   * +---+---+---+      +---+---+---+
   * When merging two rows one row must be deleted and the rowspan reduced
   */
  it("should merge two rows and set rowspan and colspan correctly", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    <anchor />1
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
              <td>
                <paragraph>
                  <text>
                    6<focus />
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
              <td colSpan={3} rowSpan={1}>
                <paragraph>
                  <text>
                    <anchor />1
                  </text>
                </paragraph>
                <paragraph>
                  <text>2</text>
                </paragraph>
                <paragraph>
                  <text>3</text>
                </paragraph>
                <paragraph>
                  <text>4</text>
                </paragraph>
                <paragraph>
                  <text>5</text>
                </paragraph>
                <paragraph>
                  <text>
                    6<focus />
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

    // apply selection by triggering a selection operation
    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    TableEditor.merge(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * |<1 | 2 | 3 |  =>  |<1 | 2 | 3 |
   * +---+---+---+      + 4>+---+---+
   * | 4>| 5 | 6 |      |   | 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should merge cells in the same column", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    <anchor />1
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
                  <text>
                    4<focus />
                  </text>
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
          <tbody>
            <tr>
              <td rowSpan={2} colSpan={1}>
                <paragraph>
                  <text>
                    <anchor />1
                  </text>
                </paragraph>
                <paragraph>
                  <text>
                    4<focus />
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    // apply selection by triggering a selection operation
    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    TableEditor.merge(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+
   * |<1 | 2 | 3 |  =>  |<1 | 3 |
   * +---+---+---+      + … +---+
   * | 4 | 5>| 6 |      | 5>| 6 |
   * +---+---+---+      +---+---+
   */
  it("should merge two columns and set rowspan and colspan correctly", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    <anchor />1
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
                  <text>
                    5<focus />
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
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td colSpan={1} rowSpan={2}>
                <paragraph>
                  <text>
                    <anchor />1
                  </text>
                </paragraph>
                <paragraph>
                  <text>2</text>
                </paragraph>
                <paragraph>
                  <text>4</text>
                </paragraph>
                <paragraph>
                  <text>
                    5<focus />
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
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    // apply selection by triggering a selection operation
    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    TableEditor.merge(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * |   |<2 | 3 |  =>  |   |<2     |
   * + 1 +---+---+      + 1 + …     +
   * |   | 4 | 5>|      |   | 5>    |
   * +---+---+---+      +---+---+---+
   * | 6 | 7 | 8 |      | 6 | 7 | 8 |
   * +---+---+---+      +---+---+---+
   */
  it("should merge two rows when the previous column has a rowspan", () => {
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
                  <text>
                    <anchor />2
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
                  <text>
                    5<focus />
                  </text>
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
              <td rowSpan={1}>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td rowSpan={1} colSpan={2}>
                <paragraph>
                  <text>
                    <anchor />2
                  </text>
                </paragraph>
                <paragraph>
                  <text>3</text>
                </paragraph>
                <paragraph>
                  <text>4</text>
                </paragraph>
                <paragraph>
                  <text>
                    5<focus />
                  </text>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    // apply selection by triggering a selection operation
    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    TableEditor.merge(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:
   * +---+---+---+
   * | 1 | 2 | 3 |
   * +---+---+---+
   * | 4 | 5 | 6 |
   * +---+---+---+
   */
  it("should not be possible to merge when selection is empty", () => {
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    expect(TableEditor.canMerge(editor)).toBe(false);
  });

  /*
   * Actual:
   * +---+---+---+
   * |<h | h | h |
   * +---+---+---+
   * | 1 | 2 | 3>|
   * +---+---+---+
   * | 4 | 5 | 6 |
   * +---+---+---+
   */
  it("should not be possible to merge when selection is not within thead and tbody", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>
                    <anchor />h
                  </text>
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
                    3<focus />
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

    // apply selection by triggering a selection operation
    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    expect(TableEditor.canMerge(editor)).toBe(false);
  });

  /*
   * Actual:
   * +---+---+---+
   * | 1 | 2 | 3 |
   * +---+---+---+
   * | 4 |<5 | 6 |
   * +---+---+---+
   * | f | f>| f |
   * +---+---+---+
   */
  it("should not be possible to merge when selection is not within tbody and tfoot", () => {
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
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    <anchor />5
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
                  <text>f</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    f<focus />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>f</text>
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    // apply selection by triggering a selection operation
    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    expect(TableEditor.canMerge(editor)).toBe(false);
  });

  /*
   * Actual:
   * +---+---+---+
   * |<1 | 2 | 3 |
   * +---+---+---+
   * | 4 | 5>| 6 |
   * +---+---+---+
   */
  it("should be possible to merge when selection is within tbody", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    <anchor />1
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
                  <text>
                    5<focus />
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
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    // apply selection by triggering a selection operation
    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    expect(TableEditor.canMerge(editor)).toBe(true);
  });
});
