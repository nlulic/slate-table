/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";
import { TableEditor } from "../../src/table-editor";
import assert from "assert";

describe("removeTable", () => {
  it("should remove the table in the current selection", () => {
    const actual = (
      <editor>
        <paragraph />
        <table>
          <tr>
            <td>
              <cursor />
            </td>
          </tr>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <paragraph />
      </editor>
    );

    const editor = withTest(
      withTable(actual, {
        blocks: {
          table: "table",
          row: "table-row",
          cell: "table-cell",
          content: "paragraph",
        },
      })
    );

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
          <tr>
            <td>
              <cursor />
            </td>
          </tr>
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

    const editor = withTest(
      withTable(actual, {
        blocks: {
          table: "table",
          row: "table-row",
          cell: "table-cell",
          content: "paragraph",
        },
      })
    );

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
          <tr>
            <td>
              <focus />
            </td>
          </tr>
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

    const editor = withTest(
      withTable(actual, {
        blocks: {
          table: "table",
          row: "table-row",
          cell: "table-cell",
          content: "paragraph",
        },
      })
    );

    TableEditor.removeTable(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should do nothing if selection is not inside a table", () => {
    const actual = (
      <editor>
        <paragraph />
        <table>
          <tr>
            <td>
              <text />
            </td>
          </tr>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <paragraph />
        <table>
          <tr>
            <td>
              <text />
            </td>
          </tr>
        </table>
      </editor>
    );

    const editor = withTest(
      withTable(actual, {
        blocks: {
          table: "table",
          row: "table-row",
          cell: "table-cell",
          content: "paragraph",
        },
      })
    );

    TableEditor.removeTable(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
