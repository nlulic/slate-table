/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { TableCursor } from "../../src/table-cursor";
import { DEFAULT_TEST_WITH_TABLE_OPTIONS, jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";

describe("upward", () => {
  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |  =>  | 1 | 2*| 3 |
   * +---+---+---+      +---+---+---+
   * | 4 |*5 | 6 |      | 4 | 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor to the end of the cell above", () => {
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
                  <text>
                    <cursor />5
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    const successful = TableCursor.upward(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
    expect(successful).toBe(true);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |  =>  | 1 |*2 | 3 |
   * +---+---+---+      +---+---+---+
   * | 4 | 5*| 6 |      | 4 | 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor to the start of the cell above", () => {
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
                    <cursor />2
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    const successful = TableCursor.upward(editor, { mode: "start" });
    expect(successful).toBe(true);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |  =>  | 1 |<2>| 3 |
   * +---+---+---+      +---+---+---+
   * | 4 | 5*| 6 |      | 4 | 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor to the start of the cell above", () => {
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
                    <anchor />2<focus />
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    const successful = TableCursor.upward(editor, { mode: "all" });
    expect(successful).toBe(true);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * text*              text*
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |  =>  | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * | 4 | 5 | 6 |      | 4 | 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should not move the cursor if the cursor is not inside the table", () => {
    const actual = (
      <editor>
        <paragraph>
          text
          <cursor />
        </paragraph>
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
        <paragraph>
          text
          <cursor />
        </paragraph>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    const successful = TableCursor.upward(editor);
    expect(successful).toBe(false);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * text               text*
   * +---+---+---+      +---+---+---+
   * | 1 | 2*| 3 |  =>  | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * | 4 | 5 | 6 |      | 4 | 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor from the first row to the tables previous sibling", () => {
    const actual = (
      <editor>
        <paragraph>text</paragraph>
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
        <paragraph>
          text
          <cursor />
        </paragraph>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    const successful = TableCursor.upward(editor);
    expect(successful).toBe(true);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2*| 3 |  =>  | 1 | 2*| 3 |
   * +---+---+---+      +---+---+---+
   * | 4 | 5 | 6 |      | 4 | 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should not move the cursor from the first row if table has no previous sibling", () => {
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    const successful = TableCursor.upward(editor);
    expect(successful).toBe(false);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |  =>  | 1 | 2*| 3 |
   * +---+---+---+      +---+---+---+
   * | 4 |<5 | 6>|      | 4 | 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor from the start of the selection if not collapsed", () => {
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
                  <text>
                    <anchor />5
                  </text>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    const successful = TableCursor.upward(editor);
    expect(successful).toBe(true);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
