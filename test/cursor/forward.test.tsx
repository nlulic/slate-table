/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { TableCursor } from "../../src/table-cursor";
import { DEFAULT_TEST_WITH_TABLE_OPTIONS, jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";

describe("forward", () => {
  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 |*2 | 3 |  =>  | 1 | 2 | 3*|
   * +---+---+---+      +---+---+---+
   * | 4 | 5 | 6 |      | 4 | 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor to the end of the next cell", () => {
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

    const successful = TableCursor.forward(editor);
    expect(successful).toBe(true);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2*| 3 |  =>  | 1 | 2 |*3 |
   * +---+---+---+      +---+---+---+
   * | 4 | 5 | 6 |      | 4 | 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor to the start of the next cell", () => {
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
                  <text>2</text>
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

    const successful = TableCursor.forward(editor, { mode: "start" });
    expect(successful).toBe(true);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2*| 3 |  =>  | 1 | 2 |<3>|
   * +---+---+---+      +---+---+---+
   * | 4 | 5 | 6 |      | 4 | 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor to the start of the next cell", () => {
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
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>
                    <anchor />3<focus />
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

    const successful = TableCursor.forward(editor, { mode: "all" });
    expect(successful).toBe(true);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3*|  =>  | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * | 4 | 5 | 6 |      | 4*| 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor to the start of the next row", () => {
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

    const successful = TableCursor.forward(editor);
    expect(successful).toBe(true);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 |   | 3 |  =>  | 1 |   | 3*|
   * +---+ 2*+---+      +---+ 2 +---+
   * | 4 |   | 6 |      | 4 |   | 6 |
   * +---+---+---+      +---+---+---+
   * | 7 | 8 | 9 |      | 7 | 8 | 9 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor to the end of the next cell when selection is in rowspan", () => {
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
              <td rowSpan={2}>
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
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
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

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    const successful = TableCursor.forward(editor);
    expect(successful).toBe(true);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * |   | 2 | 3*|  =>  |   | 2 | 3 |
   * + 1 +---+---+      + 1 +---+---+
   * |   | 4 | 5 |      |   | 4*| 5 |
   * +---+---+---+      +---+---+---+
   * | 6 | 7 | 8 |      | 6 | 7 | 8 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor to the next row when the first column contains a rowspan", () => {
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

    const successful = TableCursor.forward(editor);
    expect(successful).toBe(true);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 |   | 3 |  =>  | 1 |   | 3 |
   * +---+ 2 +---+      +---+ 2 +---+
   * | 4*|   | 5 |      | 4 |   | 5*|
   * +---+---+---+      +---+---+---+
   * | 6 | 7 | 8 |      | 6 | 7 | 8 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor to the next cell and skip cells which are part of a rowspan", () => {
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
              <td rowSpan={2}>
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
                  <text>1</text>
                </paragraph>
              </td>
              <td rowSpan={2}>
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
                    5<cursor />
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

    const successful = TableCursor.forward(editor);
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

    const successful = TableCursor.forward(editor);
    expect(successful).toBe(false);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |  =>  | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * | 4 | 5 | 6*|      | 4 | 5 | 6 |
   * +---+---+---+      +---+---+---+
   * text               text*
   */
  it("should move the cursor from the last row to the tables next sibling", () => {
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
                  <text>
                    <cursor />6
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>text</paragraph>
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
        <paragraph>
          text
          <cursor />
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    const successful = TableCursor.forward(editor);
    expect(successful).toBe(true);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 | 2 | 3 |  =>  | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * | 4 | 5 | 6*|      | 4 | 5 | 6*|
   * +---+---+---+      +---+---+---+
   */
  it("should not move the cursor from the last cell if the has no next sibling", () => {
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
                  <text>
                    <cursor />6
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
                  <text>
                    <cursor />6
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    const successful = TableCursor.forward(editor);
    expect(successful).toBe(false);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * | 1 |<2 | 3>|  =>  | 1 | 2 | 3 |
   * +---+---+---+      +---+---+---+
   * | 4 | 5 | 6 |      | 4*| 5 | 6 |
   * +---+---+---+      +---+---+---+
   */
  it("should move the cursor from the end of the selection if not collapsed", () => {
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
                    2<anchor />
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>
                    3<focus />
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

    const successful = TableCursor.forward(editor);
    expect(successful).toBe(true);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
