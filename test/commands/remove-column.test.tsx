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
});
