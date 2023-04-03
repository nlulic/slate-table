/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { TableEditor } from "../../src/table-editor";
import { jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";

describe("removeRow", () => {
  it("should remove the row in the current selection", () => {
    const actual = (
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
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text />
                  <cursor />
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
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.removeRow(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should remove the row at a specified location", () => {
    const actual = (
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
                <paragraph>
                  <text />
                  <cursor />
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text />
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
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.removeRow(editor, { at: [0, 1, 1] });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should remove thead if the last row is removed", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text />
                  <cursor />
                </paragraph>
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

    const expected = (
      <editor>
        <table>
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

    TableEditor.removeRow(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should remove tfoot if the last row is removed", () => {
    const actual = (
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
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <cursor />
                  <text />
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

    TableEditor.removeRow(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should remove tbody if the last row is removed", () => {
    const actual = (
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
                <paragraph>
                  <cursor />
                  <text />
                </paragraph>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph />
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
                <paragraph />
              </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td>
                <paragraph />
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.removeRow(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should remove table if the last row of the last parent (tbody, thead, tfoot) is deleted", () => {
    const actual = (
      <editor>
        <paragraph>
          <text />
        </paragraph>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <cursor />
                  <text />
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
          <text />
          <cursor />
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    TableEditor.removeRow(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
