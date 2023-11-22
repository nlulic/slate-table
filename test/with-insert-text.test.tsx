/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../src/options";
import { jsx, withTest } from "./testutils";
import { withTable } from "../src/with-table";

describe("withInsertText", () => {
  describe("insertText", () => {
    /*
     * Actual:              Expected:
     * +------+------+      +------+--------+
     * |<Pear | Lime>|  =>  | Pear | Limee* |
     * +------+------+      +------+--------+
     * | Plum | Kiwi |      | Plum | Kiwi   |
     * +------+------+      +------+--------+
     */
    it("should collapse range to focus when range is in table", () => {
      const actual = (
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
                    <text>
                      Lime
                      <focus />
                    </text>
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
        </editor>
      );

      const expected = (
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
                    <text>
                      Limee
                      <cursor />
                    </text>
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
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.insertText("e");

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * befo<re              before
     * +------+------+      +------+--------+
     * | Pear | Lime>|  =>  | Pear | Limee* |
     * +------+------+      +------+--------+
     * | Plum | Kiwi |      | Plum | Kiwi   |
     * +------+------+      +------+--------+
     */
    it("should collapse range to focus when anchor is above and focus in table", () => {
      const actual = (
        <editor>
          <paragraph>
            <text>
              befo
              <anchor />
              re
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
                    <text>
                      Lime
                      <focus />
                    </text>
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
        </editor>
      );

      const expected = (
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
                    <text>
                      Limee
                      <cursor />
                    </text>
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
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.insertText("e");

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * | Pear | Lime |  =>  | Pear | Lime |
     * +------+------+      +------+------+
     * | Plum<| Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     * after>               aftere*
     */
    it("should collapse range to focus when focus is below and anchor in table", () => {
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
              after
              <focus />
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
              aftere
              <cursor />
            </text>
          </paragraph>
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.insertText("e");

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * |<Pear>| Lime |  =>  | e*   | Lime |
     * +------+------+      +------+------+
     * | Plum | Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     */
    it("should not collapse range when range is in common cell", () => {
      const actual = (
        <editor>
          <table>
            <thead>
              <tr>
                <th>
                  <paragraph>
                    <text>
                      <anchor />
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
                      e<cursor />
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
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.insertText("e");

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });
  });

  describe("insertBreak", () => {
    /*
     * Actual:              Expected:
     * +------+------+      +------+--------+
     * |<Pear | Lime>|  =>  | Pear | Lime   |
     * |      |      |      |      | *      |
     * +------+------+      +------+--------+
     * | Plum | Kiwi |      | Plum | Kiwi   |
     * +------+------+      +------+--------+
     */
    it("should collapse range to focus when range is in table", () => {
      const actual = (
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
                    <text>
                      Lime
                      <focus />
                    </text>
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
        </editor>
      );

      const expected = (
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
                  <paragraph>
                    <text>
                      <cursor />
                    </text>
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
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.insertBreak();

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * befo<re              before
     * +------+------+      +------+--------+
     * | Pear | Lime>|  =>  | Pear | Lime   |
     * |      |      |      |      | *      |
     * +------+------+      +------+--------+
     * | Plum | Kiwi |      | Plum | Kiwi   |
     * +------+------+      +------+--------+
     */
    it("should collapse range to focus when anchor is above and focus in table", () => {
      const actual = (
        <editor>
          <paragraph>
            <text>
              befo
              <anchor />
              re
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
                    <text>
                      Lime
                      <focus />
                    </text>
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
        </editor>
      );

      const expected = (
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
                  <paragraph>
                    <text>
                      <cursor />
                    </text>
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
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.insertBreak();

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * | Pear | Lime |  =>  | Pear | Lime |
     * +------+------+      +------+------+
     * | Plum<| Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     * after>               after
     *                      *
     */
    it("should collapse range to focus when focus is below and anchor in table", () => {
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
              after
              <focus />
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
            <text>after</text>
          </paragraph>
          <paragraph>
            <text>
              <cursor />
            </text>
          </paragraph>
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.insertBreak();

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * |<Pear>| Lime |  =>  |      | Lime |
     * |      |      |      | *    |      |
     * +------+------+      +------+------+
     * | Plum | Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     */
    it("should not collapse range when range is in common cell", () => {
      const actual = (
        <editor>
          <table>
            <thead>
              <tr>
                <th>
                  <paragraph>
                    <text>
                      <anchor />
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
                  <paragraph>
                    <text>
                      <cursor />
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
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.insertBreak();

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });
  });

  describe("insertSoftBreak", () => {
    /*
     * Actual:              Expected:
     * +------+------+      +------+--------+
     * |<Pear | Lime>|  =>  | Pear | Lime   |
     * |      |      |      |      | *      |
     * +------+------+      +------+--------+
     * | Plum | Kiwi |      | Plum | Kiwi   |
     * +------+------+      +------+--------+
     */
    it("should collapse range to focus when range is in table", () => {
      const actual = (
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
                    <text>
                      Lime
                      <focus />
                    </text>
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
        </editor>
      );

      const expected = (
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
                  <paragraph>
                    <text>
                      <cursor />
                    </text>
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
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.insertSoftBreak();

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * befo<re              before
     * +------+------+      +------+--------+
     * | Pear | Lime>|  =>  | Pear | Lime   |
     * |      |      |      |      | *      |
     * +------+------+      +------+--------+
     * | Plum | Kiwi |      | Plum | Kiwi   |
     * +------+------+      +------+--------+
     */
    it("should collapse range to focus when anchor is above and focus in table", () => {
      const actual = (
        <editor>
          <paragraph>
            <text>
              befo
              <anchor />
              re
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
                    <text>
                      Lime
                      <focus />
                    </text>
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
        </editor>
      );

      const expected = (
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
                  <paragraph>
                    <text>
                      <cursor />
                    </text>
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
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.insertSoftBreak();

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * | Pear | Lime |  =>  | Pear | Lime |
     * +------+------+      +------+------+
     * | Plum<| Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     * after>               after
     *                      *
     */
    it("should collapse range to focus when focus is below and anchor in table", () => {
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
              after
              <focus />
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
            <text>after</text>
          </paragraph>
          <paragraph>
            <text>
              <cursor />
            </text>
          </paragraph>
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.insertSoftBreak();

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * |<Pear>| Lime |  =>  |      | Lime |
     * |      |      |      | *    |      |
     * +------+------+      +------+------+
     * | Plum | Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     */
    it("should not collapse range when range is in common cell", () => {
      const actual = (
        <editor>
          <table>
            <thead>
              <tr>
                <th>
                  <paragraph>
                    <text>
                      <anchor />
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
                  <paragraph>
                    <text>
                      <cursor />
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
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.insertSoftBreak();

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });
  });
});
