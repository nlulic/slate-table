/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../src/options";
import { jsx, withTest } from "./testutils";
import { withTable } from "../src/with-table";

describe("withDeletion", () => {
  describe("deleteForward", () => {
    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * |*Pear | Lime |  =>  |*ear  | Lime |
     * +------+------+      +------+------+
     * | Plum | Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     */
    test("delete works when cursor is inside cell", () => {
      const actual = (
        <editor>
          <table>
            <thead>
              <tr>
                <th>
                  <paragraph>
                    <text>
                      <cursor />
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
                      <cursor />
                      ear
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

      editor.deleteForward("character");

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * | Pear*| Lime |  =>  | Pear*| Lime |
     * +------+------+      +------+------+
     * | Plum | Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     */
    it("should have no effect on delete with cursor at the end of the cell content", () => {
      const actual = (
        <editor>
          <table>
            <thead>
              <tr>
                <th>
                  <paragraph>
                    <text>
                      Pear
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

      const expected = (
        <editor>
          <table>
            <thead>
              <tr>
                <th>
                  <paragraph>
                    <text>
                      Pear
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

      editor.deleteForward("character");

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * |<Pear>| Lime |  =>  |<Pear>| Lime |
     * +------+------+      +------+------+
     * | Plum | Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     */
    it("should have no effect on delete when selection is not collapsed", () => {
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

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.deleteForward("character");

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * hello*               hello
     * +------+------+      +------+------+
     * | Pear | Lime |  =>  |*Pear | Lime |
     * +------+------+      +------+------+
     * | Plum | Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     */
    it("should move cursor to first cell on delete before table", () => {
      const actual = (
        <editor>
          <paragraph>
            <text>
              hello
              <cursor />
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
        </editor>
      );

      const expected = (
        <editor>
          <paragraph>
            <text>hello</text>
          </paragraph>
          <table>
            <thead>
              <tr>
                <th>
                  <paragraph>
                    <text>
                      <cursor />
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
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.deleteForward("character");

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });
  });

  describe("deleteBackward", () => {
    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * | Pear*| Lime |  =>  | Pea* | Lime |
     * +------+------+      +------+------+
     * | Plum | Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     */
    test("delete works when cursor is inside cell", () => {
      const actual = (
        <editor>
          <table>
            <thead>
              <tr>
                <th>
                  <paragraph>
                    <text>
                      Pear
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

      const expected = (
        <editor>
          <table>
            <thead>
              <tr>
                <th>
                  <paragraph>
                    <text>
                      Pea
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

      editor.deleteBackward("character");

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * |*Pear | Lime |  =>  |*Pear | Lime |
     * +------+------+      +------+------+
     * | Plum | Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     */
    it("should have no effect on delete with cursor at the start of the cell content", () => {
      const actual = (
        <editor>
          <table>
            <thead>
              <tr>
                <th>
                  <paragraph>
                    <text>
                      <cursor />
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
                      <cursor />
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
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.deleteBackward("character");

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * |<Pear>| Lime |  =>  |<Pear>| Lime |
     * +------+------+      +------+------+
     * | Plum | Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     */
    it("should have no effect on delete when selection is not collapsed", () => {
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

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.deleteBackward("character");

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * | Pear | Lime |  =>  | Pear | Lime |
     * +------+------+      +------+------+
     * | Plum | Kiwi |      | Plum | Kiwi*|
     * +------+------+      +------+------+
     * hello*               hello
     */
    it("should move cursor to last cell on delete after table", () => {
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
                    <text>Kiwi</text>
                  </paragraph>
                </td>
              </tr>
            </tbody>
          </table>
          <paragraph>
            <text>
              <cursor />
              hello
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
                      <cursor />
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
                    <text>
                      Kiwi
                      <cursor />
                    </text>
                  </paragraph>
                </td>
              </tr>
            </tbody>
          </table>
          <paragraph>
            <text>hello</text>
          </paragraph>
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.deleteBackward("character");

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });
  });
});
