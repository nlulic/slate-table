/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../src/options";
import { Range, SelectionOperation } from "slate";
import { jsx, withTest } from "./testutils";
import { withTable } from "../src/with-table";

describe("withDelete", () => {
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

  describe("deleteFragment", () => {
    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * |<Pear | Lime |  =>  |  *   | Lime |
     * +------+------+      +------+------+
     * | Plum>| Kiwi |      |      | Kiwi |
     * +------+------+      +------+------+
     */
    it("should clear selection and place the cursor at the start of the deletion when direction is backward", () => {
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
                      <focus />
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
                    <text />
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

      // apply selection by triggering a selection operation
      const operation: SelectionOperation = {
        type: "set_selection",
        properties: null,
        newProperties: editor.selection as Range,
      };

      editor.apply(operation);

      editor.deleteFragment({ direction: "backward" });

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * |<Pear | Lime |  =>  |      | Lime |
     * +------+------+      +------+------+
     * | Plum>| Kiwi |      |  *   | Kiwi |
     * +------+------+      +------+------+
     */
    it("should clear selection and place the cursor at the end of the deletion when direction is forward", () => {
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
                      <focus />
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
                      <cursor />
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
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      // apply selection by triggering a selection operation
      const operation: SelectionOperation = {
        type: "set_selection",
        properties: null,
        newProperties: editor.selection as Range,
      };

      editor.apply(operation);

      editor.deleteFragment({ direction: "forward" });

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * |<Pear | Lime |  =>  |  *   |      |
     * +------+------+      +------+------+
     * | Plum>| Kiwi |      |      | Kiwi |
     * +------+------+      +------+------+
     */
    it("should clear cells in range when `withSelection` false and place cursor to start of the deletion when direction is backward", () => {
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
                      <focus />
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
                    </text>
                  </paragraph>
                </th>
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
                  <paragraph>
                    <text />
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

      const options = { ...DEFAULT_WITH_TABLE_OPTIONS, withSelection: false };

      const editor = withTest(withTable(actual, options));

      editor.deleteFragment({ direction: "backward" });

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * | Pear |>Lime |  =>  | Pear |      |
     * +------+------+      +------+------+
     * | Plum | Kiwi<|      |      |  *   |
     * +------+------+      +------+------+
     */
    it("should clear cells in range when `withSelection` false and place cursor to end of the deletion when direction is forward", () => {
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
                    <text>
                      <focus />
                      Lime
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
                    <text>
                      Ki
                      <anchor />
                      wi
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
                    <text>Pear</text>
                  </paragraph>
                </th>
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
                  <paragraph>
                    <text />
                  </paragraph>
                </td>
                <td>
                  <paragraph>
                    <text>
                      <cursor />
                    </text>
                  </paragraph>
                </td>
              </tr>
            </tbody>
          </table>
        </editor>
      );

      const options = { ...DEFAULT_WITH_TABLE_OPTIONS, withSelection: false };

      const editor = withTest(withTable(actual, options));

      editor.deleteFragment({ direction: "forward" });

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * hello<           =>  hello*
     * +------+------+
     * | Pear | Lime |
     * +------+------+
     * | Plum | Kiwi>|
     * +------+------+
     */
    it("should not clear cells when range is not in common cell", () => {
      const actual = (
        <editor>
          <paragraph>
            <text>
              hello
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
                    <text>
                      Kiwi
                      <focus />
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
          <paragraph>
            <text>
              hello
              <cursor />
            </text>
          </paragraph>
        </editor>
      );

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      editor.deleteFragment({ direction: "backward" });

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });

    /*
     * Actual:              Expected:
     * +------+------+      +------+------+
     * | Pear |Li<me>|  =>  | Pear |  Li* |
     * +------+------+      +------+------+
     * | Plum | Kiwi |      | Plum | Kiwi |
     * +------+------+      +------+------+
     */
    it("should not clear cells when range is in common cell", () => {
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
                    <text>
                      Li
                      <anchor />
                      me
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
                      Li
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

      editor.deleteFragment({ direction: "backward" });

      assert.deepEqual(editor.children, expected.children);
      assert.deepEqual(editor.selection, expected.selection);
    });
  });
});
