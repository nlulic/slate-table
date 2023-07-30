/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { TableCursor } from "../../src/table-cursor";
import { jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";

describe("move to the previous column", () => {
  it("should move the cursor to the previous cell", () => {
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
              <td>
                <paragraph>
                  <text>text 1</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    <cursor />
                    text 2
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
                <paragraph />
              </th>
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
                <paragraph />
              </td>
              <td>
                <paragraph>
                  <text>
                    text 1<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>text 2</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const fakeEvent = { preventDefault: jest.fn() };
    TableCursor.previous(editor, fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should not move the cursor if the cursor is not at the start of the last text node", () => {
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
              <td>
                <paragraph>
                  <text>text 1</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    text 2<cursor />
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
                <paragraph />
              </th>
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
                <paragraph />
              </td>
              <td>
                <paragraph>
                  <text>text 1</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    text 2<cursor />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const fakeEvent = { preventDefault: jest.fn() };
    TableCursor.previous(editor, fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(0);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should move the cursor from first column to last column in the above row", () => {
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
              <th>
                <paragraph>
                  <text>text 1</text>
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
                    text 2
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph />
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
              <th>
                <paragraph />
              </th>
              <th>
                <paragraph>
                  <text>
                    text 1<cursor />
                  </text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>text 2</text>
                </paragraph>
              </td>
              <td>
                <paragraph />
              </td>
              <td>
                <paragraph />
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const fakeEvent = { preventDefault: jest.fn() };
    TableCursor.previous(editor, fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should move the cursor from first column of the first row to the tables previous sibling", () => {
    const actual = (
      <editor>
        <paragraph>text 1</paragraph>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>
                    <cursor />
                    text 2
                  </text>
                </paragraph>
              </th>
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
                <paragraph />
              </td>
              <td>
                <paragraph />
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
        <paragraph>
          text 1<cursor />
        </paragraph>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>text 2</text>
                </paragraph>
              </th>
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
                <paragraph />
              </td>
              <td>
                <paragraph />
              </td>
              <td>
                <paragraph />
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const fakeEvent = { preventDefault: jest.fn() };
    TableCursor.previous(editor, fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
