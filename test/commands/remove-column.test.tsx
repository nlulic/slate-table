/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { TableEditor } from "../../src/table-editor";
import { jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";

describe("removeColumn", () => {
  it("should remove the column at the current selection", () => {
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
                <paragraph />
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

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should remove the column at a specified location", () => {
    const actual = (
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
                <paragraph />
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

    TableEditor.removeColumn(editor, { at: [0, 1, 0, 0] });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should remove the table if it has only one column", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph />
              </th>
            </tr>
            <tr>
              <th>
                <paragraph />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph />
              </td>
            </tr>
            <tr>
              <td>
                <paragraph />
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const expected = <editor />;

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.removeColumn(editor, { at: [0, 1, 0, 0] });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+---+
   * | 1 | 2*| 3 | 4 |  =>  | 1 | 2 | 3 | 4 |
   * +---+---+---+---+      +---+---+---+---+
   * | 5 |     6     |      | 5 |     6     |
   * +---+---+---+---+      +---+---+---+---+
   * |   7   | 8 | 9 |      |   7   | 8 | 9 |
   * +---+---+---+---+      +---+---+---+---+
   */
  it("should remove the column and correctly reduce colspan", () => {
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

    const editor = withTest(
      withTable(actual, {
        ...DEFAULT_WITH_TABLE_OPTIONS,
        withNormalization: false,
      })
    );

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+---+      +---+---+---+
   * | 1 | 2 | 3 | 4 |  =>  | 1 | 3 | 4 |
   * +---+---+---+---+      +---+---+---+
   * | 5 |     6*    |      | 5 |   6   |
   * +---+---+---+---+      +---+---+---+
   * |   7   | 8 | 9 |      | 7 | 8 | 9 |
   * +---+---+---+---+      +---+---+---+
   */
  it("should remove the column and correctly reduce colspan when selection has a colspan", () => {
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
                  <text>5</text>
                </paragraph>
              </td>
              <td colSpan={3}>
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
              <td colSpan={2}>
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

    const editor = withTest(
      withTable(actual, {
        ...DEFAULT_WITH_TABLE_OPTIONS,
        withNormalization: false,
      })
    );

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:                Expected:
   * +---+---+---+      +---+---+
   * | 1 | 2 | 3 |  =>  | 1 | 3 |
   * +---+---+---+      +---+---+
   * |   4   | 5 |      | 4 | 5 |
   * +---+---+---+      +---+---+
   * | 6 |   | 8 |      | 6 | 8 |
   * +---+ 7 +---+      +---+---+
   * | 9 |   | 0 |      | 9 | 0 |
   * +---+---+---+      +---+---+
   */
  it("should remove the column with a rowspan correctly", () => {
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
              <td colSpan={2}>
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
          </tbody>
          <tfoot>
            <tr>
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
                  <text>3</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={1}>
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
                  <text>8</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
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

    const editor = withTest(
      withTable(actual, {
        ...DEFAULT_WITH_TABLE_OPTIONS,
        withNormalization: false,
      })
    );

    TableEditor.removeColumn(editor);

    assert.deepEqual(editor.children, expected.children);
    // assert.deepEqual(editor.selection, expected.selection);
  });
});
