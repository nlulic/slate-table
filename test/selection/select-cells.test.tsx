/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { Editor, Range, SelectionOperation, Transforms } from "slate";
import { TableCursor } from "../../src/table-cursor";
import { isOfType } from "../../src/utils";
import { jsx, withTest } from "../testutils";
import { withTable } from "../../src/with-table";

describe("withSelection", () => {
  /*
   * Actual:             Expected:
   * +---+---+---+       +---+---+---+
   * |>1 | 2 | 3<|  =>   | X | X | X |
   * +---+---+---+       +---+---+---+
   * | 4 | 5 | 6 |       | 4 | 5 | 6 |
   * +---+---+---+       +---+---+---+
   * | 7 | 8 | 9 |       | 7 | 8 | 9 |
   * +---+---+---+       +---+---+---+
   */
  it("should select the correct cells horizontally from ltr", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>
                    1<focus />
                  </text>
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
                    3<anchor />
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
          <thead>
            <tr>
              <th data={{ selected: true }}>
                <paragraph>
                  <text>
                    1<focus />
                  </text>
                </paragraph>
              </th>
              <th data={{ selected: true }}>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th data={{ selected: true }}>
                <paragraph>
                  <text>
                    3<anchor />
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

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:             Expected:
   * +---+---+---+       +---+---+---+
   * |<1 | 2 | 3>|  =>   | X | X | X |
   * +---+---+---+       +---+---+---+
   * | 4 | 5 | 6 |       | 4 | 5 | 6 |
   * +---+---+---+       +---+---+---+
   * | 7 | 8 | 9 |       | 7 | 8 | 9 |
   * +---+---+---+       +---+---+---+
   */
  it("should select the correct cells horizontally from rtl", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>
                    1<anchor />
                  </text>
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
          <thead>
            <tr>
              <th data={{ selected: true }}>
                <paragraph>
                  <text>
                    1<anchor />
                  </text>
                </paragraph>
              </th>
              <th data={{ selected: true }}>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th data={{ selected: true }}>
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

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:             Expected:
   * +---+---+---+       +---+---+---+
   * | 1 |>2 | 3 |  =>   | 1 | X | 3 |
   * +---+---+---+       +---+---+---+
   * | 4 | 5 | 6 |       | 4 | X | 6 |
   * +---+---+---+       +---+---+---+
   * | 7 | 8<| 9 |       | 7 | X | 9 |
   * +---+---+---+       +---+---+---+
   */
  it("should select the correct cells vertically from ttb", () => {
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
                    <focus />2
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
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    <anchor />8
                  </text>
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
              <th data={{ selected: true }}>
                <paragraph>
                  <text>
                    <focus />2
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
              <td data={{ selected: true }}>
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
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td data={{ selected: true }}>
                <paragraph>
                  <text>
                    <anchor />8
                  </text>
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

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:             Expected:
   * +---+---+---+       +---+---+---+
   * | 1 |<2 | 3 |  =>   | 1 | X | 3 |
   * +---+---+---+       +---+---+---+
   * | 4 | 5 | 6 |       | 4 | X | 6 |
   * +---+---+---+       +---+---+---+
   * | 7 | 8>| 9 |       | 7 | X | 9 |
   * +---+---+---+       +---+---+---+
   */
  it("should select the correct cells vertically from btt", () => {
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
                    <anchor />2
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
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    <focus />8
                  </text>
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
              <th data={{ selected: true }}>
                <paragraph>
                  <text>
                    <anchor />2
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
              <td data={{ selected: true }}>
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
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text>7</text>
                </paragraph>
              </td>
              <td data={{ selected: true }}>
                <paragraph>
                  <text>
                    <focus />8
                  </text>
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

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:             Expected:
   * +---+---+---+       +---+---+---+
   * | 1 | 2>| 3 |  =>   | X | X | 3 |
   * +---+---+---+       +---+---+---+
   * | 4<| 5 | 6 |       | X | X | 6 |
   * +---+---+---+       +---+---+---+
   * | 7 | 8 | 9 |       | 7 | 8 | 9 |
   * +---+---+---+       +---+---+---+
   */
  it("should select the correct cells diagonally from ltr", () => {
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
                    2<focus />
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
                  <text>
                    4<anchor />
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
          <thead>
            <tr>
              <th data={{ selected: true }}>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th data={{ selected: true }}>
                <paragraph>
                  <text>
                    2<focus />
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
              <td data={{ selected: true }}>
                <paragraph>
                  <text>
                    4<anchor />
                  </text>
                </paragraph>
              </td>
              <td data={{ selected: true }}>
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

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:             Expected:
   * +---+---+---+       +---+---+---+
   * | 1 | 2>| 3 |  =>   | 1 | X | X |
   * +---+---+---+       +---+---+---+
   * | 4 | 5 |<6 |       | 3 | X | X |
   * +---+---+---+       +---+---+---+
   * | 7 | 8 | 9 |       | 7 | 8 | 9 |
   * +---+---+---+       +---+---+---+
   */
  it("should select the correct cells diagonally from rtl", () => {
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
                    2<focus />
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
                  <text>
                    <anchor />6
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
              <th data={{ selected: true }}>
                <paragraph>
                  <text>
                    2<focus />
                  </text>
                </paragraph>
              </th>
              <th data={{ selected: true }}>
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
              <td data={{ selected: true }}>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td data={{ selected: true }}>
                <paragraph>
                  <text>
                    <anchor />6
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
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:             Expected:
   * +---+---+---+       +---+---+---+
   * | 1>| 2 | 3 |  =>   | X | X | X |
   * +---+---+---+       +---+---+---+
   * | 4 |   5<  |       | X |   X   |
   * +---+---+---+       +---+---+---+
   * | 7 | 8 | 9 |       | 7 | 8 | 9 |
   * +---+---+---+       +---+---+---+
   */
  it("should select the correct cells with colspan from rtl", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>
                    1<focus />
                  </text>
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
              <td colSpan={2}>
                <paragraph>
                  <text>
                    <anchor />5
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
              <th data={{ selected: true }}>
                <paragraph>
                  <text>
                    1<focus />
                  </text>
                </paragraph>
              </th>
              <th data={{ selected: true }}>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th data={{ selected: true }}>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data={{ selected: true }}>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td colSpan={2} data={{ selected: true }}>
                <paragraph>
                  <text>
                    <anchor />5
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
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+
   * |<1 | 2 |   3   |  =>  | X | X |   X   |
   * +---+---+---+---+      +---+---+---+---+
   * |     4>    | 5 |      |     X     | X |
   * +---+---+---+---+      +---+---+---+---+
   * | 6 | 7 | 8 | 9 |      | 6 | 7 | 8 | 9 |
   * +---+---+---+---+      +---+---+---+---+
   */
  it("should select the correct cells with colspan from ltr", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>
                    <anchor />1
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th colSpan={2}>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3}>
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
            </tr>
          </tbody>
          <tfoot>
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
              <th data={{ selected: true }}>
                <paragraph>
                  <text>
                    <anchor />1
                  </text>
                </paragraph>
              </th>
              <th data={{ selected: true }}>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th colSpan={2} data={{ selected: true }}>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} data={{ selected: true }}>
                <paragraph>
                  <text>
                    4<focus />
                  </text>
                </paragraph>
              </td>
              <td data={{ selected: true }}>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
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

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * |   | 2>| 3 |  =>  |   | X | 3 |
   * +<1 +---+---+      + X +---+---+
   * |   |   | 6 |      |   |   | 6 |
   * +---+ 5 +---+      +---+ X +---+
   * | 7 |   | 9 |      | X |   | 9 |
   * +---+---+---+      +---+---+---+
   */
  it("should select the correct cells with rowspan", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>
                <paragraph>
                  <text>
                    <anchor />1
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>
                    2<focus />
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
              <th rowSpan={2} data={{ selected: true }}>
                <paragraph>
                  <text>
                    <anchor />1
                  </text>
                </paragraph>
              </th>
              <th data={{ selected: true }}>
                <paragraph>
                  <text>
                    2<focus />
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
              <td rowSpan={2} data={{ selected: true }}>
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
          <tfoot>
            <tr>
              <td data={{ selected: true }}>
                <paragraph>
                  <text>7</text>
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

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:            Expected:
   * +---+---+---+      +---+---+---+
   * |   | 2>| 3 |  =>  |   | X | X |
   * +<1 +---+---+      + X +---+---+
   * |   |   5   |      |   |   X   |
   * +---+---+---+      +---+---+---+
   * | 6 | 7 | 8 |      | 6 | 7 | 8 |
   * +---+---+---+      +---+---+---+
   */
  it("should select the correct cells with rowspan and colspan", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td rowSpan={2}>
                <paragraph>
                  <text>
                    <anchor />1
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    2<focus />
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
              <td colSpan={2}>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
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
          </tfoot>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td rowSpan={2} data={{ selected: true }}>
                <paragraph>
                  <text>
                    <anchor />1
                  </text>
                </paragraph>
              </td>
              <td data={{ selected: true }}>
                <paragraph>
                  <text>
                    2<focus />
                  </text>
                </paragraph>
              </td>
              <td data={{ selected: true }}>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td colSpan={2} data={{ selected: true }}>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
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
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+---+
   * |<1>| 2 |  =>  | 1 | 2 |
   * +---+---+      +---+---+
   */
  it("should have no selection if the range is in a single cell", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    <focus />1<anchor />
                  </text>
                </paragraph>
              </td>
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

    const expected = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    <focus />1<anchor />
                  </text>
                </paragraph>
              </td>
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

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:        Expected:
   * +---+---+      +---+---+
   * |<1 | 2 |  =>  |<1 | 2 |
   * +---+---+      +---+---+
   * | 3 | 4 |      | 3 | 4 |
   * +---+---+      +---+---+
   *
   * +---+---+      +---+---+
   * | 1 | 2>|      | 1 | 2>|
   * +---+---+      +---+---+
   */
  it("should have no selection if the range is not in a common table", () => {
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
            </tr>
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
                    2<focus />
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
            </tr>
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
                    2<focus />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should have no selection if the range is not fully inside a table", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    <focus />1
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>
            <anchor />
            test
          </text>
        </paragraph>
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
                    <focus />1
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>
            <anchor />
            test
          </text>
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    applySelection(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should check if specific element is selected", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    <focus />1
                  </text>
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
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    // trigger the `selection`
    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    // get cells
    const [entry1, entry2, entry3] = Editor.nodes(editor, {
      match: isOfType(editor, "td"),
      at: [0, 0],
    });

    const [cell1] = entry1;
    const [cell2] = entry2;
    const [cell3] = entry3;

    // check if correct cells are selected
    expect(TableCursor.isSelected(editor, cell1)).toBeTruthy();
    expect(TableCursor.isSelected(editor, cell2)).toBeTruthy();
    expect(TableCursor.isSelected(editor, cell3)).toBeFalsy();
  });

  /** Utility function to trigger the `selection` operation and add a `selected` flag to the cells. */
  function applySelection(editor: Editor): void {
    const { selection } = editor;

    if (!Range.isRange(selection)) return;

    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: selection,
    };

    editor.apply(operation);

    for (const cells of TableCursor.selection(editor)) {
      for (const [, path] of cells) {
        Transforms.setNodes(
          editor,
          {
            data: { selected: true },
          } as Record<string, unknown>,
          { at: path }
        );
      }
    }
  }
});
