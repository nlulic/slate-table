/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";
import { TableEditor } from "../../src/table-editor";
import assert from "assert";

describe("insertTable", () => {
  it("should insert table using default options", () => {
    const actual = (
      <editor>
        <paragraph>
          <cursor />
        </paragraph>
      </editor>
    );

    // default options will insert a 2x2 table
    const expected = (
      <editor>
        <paragraph>
          <text />
        </paragraph>
        <table>
          <tr>
            <td>
              <paragraph>
                <text />
              </paragraph>
            </td>
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
            <td>
              <paragraph>
                <text />
                <cursor />
              </paragraph>
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

    TableEditor.insertTable(editor);

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should insert a table with a custom number of rows and columns", () => {
    const actual = (
      <editor>
        <paragraph>
          <cursor />
        </paragraph>
      </editor>
    );

    const expected = (
      <editor>
        <paragraph>
          <text />
        </paragraph>
        <table>
          <tr>
            <td>
              <paragraph>
                <text />
              </paragraph>
            </td>
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
            <td>
              <paragraph>
                <text />
                <cursor />
              </paragraph>
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

    TableEditor.insertTable(editor, { rows: 3, cols: 2 });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should sanitize number of rows and columns and insert a 1x1 table", () => {
    const actual = (
      <editor>
        <paragraph>
          <cursor />
        </paragraph>
      </editor>
    );

    const expected = (
      <editor>
        <paragraph>
          <text />
        </paragraph>
        <table>
          <tr>
            <td>
              <paragraph>
                <text />
                <cursor />
              </paragraph>
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

    TableEditor.insertTable(editor, { rows: -3, cols: 0 });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should insert a table at a specific location", () => {
    const actual = (
      <editor>
        <paragraph>
          <cursor />
        </paragraph>
        <paragraph />
        {/* should be inserted here */}
        <paragraph />
      </editor>
    );

    const expected = (
      <editor>
        <paragraph>
          <cursor />
        </paragraph>
        <paragraph />
        <table>
          <tr>
            <td>
              <paragraph>
                <text />
              </paragraph>
            </td>
          </tr>
        </table>
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

    TableEditor.insertTable(editor, { rows: 1, cols: 1, at: [2] });

    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
