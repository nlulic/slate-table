/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { Range, SelectionOperation } from "slate";
import { jsx, withTest } from "../testutils";
import { withTable } from "../../src/with-table";

describe("withSelectionAdjustment", () => {
  /*
   * Actual:               Expected:
   * befor<e               befor<e
   * +------+------+       +------+------+
   * | Pear>| Lime |  =>   | Pear | Lime |
   * +------+------+       +------+------+
   * | Plum | Kiwi |       | Plum | Kiwi>|
   * +------+------+       +------+------+
   * after                 after
   */
  it("should expand focus to the end of the table if anchor is above", () => {
    const actual = (
      <editor>
        <paragraph>
          <text>
            befor
            <anchor />e
          </text>
        </paragraph>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>
                    Pear
                    <focus />
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>Lime</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>Plum</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>Kiwi</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>after</text>
        </paragraph>
      </editor>
    );

    const expected = (
      <editor>
        <paragraph>
          <text>
            befor
            <anchor />e
          </text>
        </paragraph>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>Pear</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>Lime</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>Plum</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    Kiwi
                    <focus />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>after</text>
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:               Expected:
   * befor>e               befor>e
   * +------+------+       +------+------+
   * | Pear<| Lime |  =>   | Pear | Lime |
   * +------+------+       +------+------+
   * | Plum | Kiwi |       | Plum | Kiwi<|
   * +------+------+       +------+------+
   * after                 after
   */
  it("should expand anchor to the end of the table if focus is above", () => {
    const actual = (
      <editor>
        <paragraph>
          <text>
            befor
            <focus />e
          </text>
        </paragraph>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>
                    Pear
                    <anchor />
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>Lime</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>Plum</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>Kiwi</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>after</text>
        </paragraph>
      </editor>
    );

    const expected = (
      <editor>
        <paragraph>
          <text>
            befor
            <focus />e
          </text>
        </paragraph>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>Pear</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>Lime</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>Plum</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    Kiwi
                    <anchor />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>after</text>
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:               Expected:
   * before                before>
   * +------+------+       +------+------+
   * | Pear | Lime |  =>   | Pear | Lime |
   * +------+------+       +------+------+
   * | Plum | Kiwi>|       | Plum | Kiwi |
   * +------+------+       +------+------+
   * aft<er                aft<er
   */
  it("should expand focus to the point before the start of the table if anchor is below", () => {
    const actual = (
      <editor>
        <paragraph>
          <text>before</text>
        </paragraph>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>Pear</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>Lime</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>Plum</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    Kiwi
                    <focus />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>
            aft
            <anchor />
            er
          </text>
        </paragraph>
      </editor>
    );

    const expected = (
      <editor>
        <paragraph>
          <text>
            before
            <focus />
          </text>
        </paragraph>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>Pear</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>Lime</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>Plum</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>Kiwi</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>
            aft
            <anchor />
            er
          </text>
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:               Expected:
   * +------+------+       +------+------+
   * | Pear | Lime |  =>   |>Pear | Lime |
   * +------+------+       +------+------+
   * | Plum | Kiwi>|       | Plum | Kiwi |
   * +------+------+       +------+------+
   * aft<er                aft<er
   */
  it("should expand focus to the start of the table if the table is the first block", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>Pear</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>Lime</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>Plum</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    Kiwi
                    <focus />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>
            aft
            <anchor />
            er
          </text>
        </paragraph>
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
                    <focus />
                    Pear
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>Lime</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>Plum</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>Kiwi</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>
            aft
            <anchor />
            er
          </text>
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:               Expected:
   * before                before<
   * +------+------+       +------+------+
   * | Pear | Lime |  =>   | Pear | Lime |
   * +------+------+       +------+------+
   * | Plum<| Kiwi |       | Plum | Kiwi |
   * +------+------+       +------+------+
   * aft>er                aft>er
   */
  it("should expand anchor to the point before the start of the table if focus is below", () => {
    const actual = (
      <editor>
        <paragraph>
          <text>before</text>
        </paragraph>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>Pear</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>Lime</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    Plum
                    <anchor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>Kiwi</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>
            aft
            <focus />
            er
          </text>
        </paragraph>
      </editor>
    );

    const expected = (
      <editor>
        <paragraph>
          <text>
            before
            <anchor />
          </text>
        </paragraph>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>Pear</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>Lime</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>Plum</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>Kiwi</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>
            aft
            <focus />
            er
          </text>
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  /*
   * Actual:               Expected:
   * +------+------+       +------+------+
   * | Pear | Lime |  =>   |<Pear | Lime |
   * +------+------+       +------+------+
   * | Plum<| Kiwi |       | Plum | Kiwi |
   * +------+------+       +------+------+
   * aft>er                aft>er
   */
  it("should expand anchor to the start of the table if the table is the first block", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>Pear</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>Lime</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>Plum</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    Kiwi
                    <anchor />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>
            aft
            <focus />
            er
          </text>
        </paragraph>
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
                    <anchor />
                    Pear
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>Lime</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>Plum</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>Kiwi</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          <text>
            aft
            <focus />
            er
          </text>
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const operation: SelectionOperation = {
      type: "set_selection",
      properties: null,
      newProperties: editor.selection as Range,
    };

    editor.apply(operation);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
