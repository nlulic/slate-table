/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { TableCursor } from "../../src/table-cursor";
import { jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";

describe("move to the above row", () => {
  it("should move the cursor to the cell above", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph />
              </th>
              <th>
                <paragraph>
                  <text>text 1</text>
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
                <paragraph>
                  <text>
                    text 2<cursor />
                  </text>
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
              <th>
                <paragraph>
                  <text>
                    text 1<cursor />
                  </text>
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
                <paragraph>
                  <text>text 2</text>
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

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const fakeEvent = { preventDefault: jest.fn() };
    TableCursor.above(editor, fakeEvent, { edge: "top" });

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should not move the cursor if the cursor is not at the start path of the first text node", () => {
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
                  <text>
                    <cursor />
                    text 2
                  </text>
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
                  <text>
                    <cursor />
                    text 2
                  </text>
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

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const fakeEvent = { preventDefault: jest.fn() };
    TableCursor.above(editor, fakeEvent, { edge: "top" });

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(0);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should move the cursor if the cursor is not at the start path if no edge option is passed", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph />
              </th>
              <th>
                <paragraph>
                  <text>text 1</text>
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
                <paragraph />
              </td>
              <td>
                <paragraph>
                  <text>text 2</text>
                  <text>
                    <cursor />
                    text 3
                  </text>
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
              <th>
                <paragraph>
                  <text>
                    text 1<cursor />
                  </text>
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
                <paragraph />
              </td>
              <td>
                <paragraph>
                  <text>text 2</text>
                  <text>text 3</text>
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

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const fakeEvent = { preventDefault: jest.fn() };
    TableCursor.above(editor, fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should move the cursor from the first row to the tables previous sibling", () => {
    const actual = (
      <editor>
        <paragraph>text 1</paragraph>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph />
              </th>
              <th>
                <paragraph>
                  <text>
                    text 2<cursor />
                  </text>
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
                <paragraph />
              </th>
              <th>
                <paragraph>
                  <text>text 2</text>
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
    TableCursor.above(editor, fakeEvent, { edge: "top" });

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
