/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { TableEditor } from "../../src/table-editor";
import { jsx, withTest } from "../testutils";
import { withTable } from "../../src/with-table";

describe("removeTable", () => {
  it("should remove the table in the current selection", () => {
    const actual = (
      <editor>
        <paragraph />
        <table>
          <tbody>
            <tr>
              <td>
                <cursor />
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <paragraph />
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.removeTable(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should remove the specified table", () => {
    const actual = (
      <editor>
        <paragraph>
          <cursor />
        </paragraph>
        <table>
          <tbody>
            <tr>
              <td>
                <cursor />
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <paragraph>
          <cursor />
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.removeTable(editor, { at: [1] });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should remove the table inside a range selection and collapse the selection", () => {
    const actual = (
      <editor>
        <paragraph>
          <anchor />
        </paragraph>
        <table>
          <tbody>
            <tr>
              <td>
                <focus />
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <paragraph>
          <cursor />
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.removeTable(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should do nothing if selection is not inside a table", () => {
    const actual = (
      <editor>
        <paragraph />
        <table>
          <tbody>
            <tr>
              <td>
                <text />
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <paragraph />
        <table>
          <tbody>
            <tr>
              <td>
                <text />
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.removeTable(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
