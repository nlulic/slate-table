/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { TableCursor } from "../../src/table-cursor";
import { jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";

describe("move to the next column", () => {
  it("should move the cursor to the next cell", () => {
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
    TableCursor.next(editor, fakeEvent, { edge: "right" });

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should not move the cursor if the cursor is not at the end of the last text node", () => {
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
                  <text>
                    <cursor />
                    text 1
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
                    <cursor />
                    text 1
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
    TableCursor.next(editor, fakeEvent, { edge: "right" });

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(0);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should not move the cursor if the cursor is not at the end of the last text node if no edge option is passed", () => {
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
                  <text>
                    <cursor />
                    text 1
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
    TableCursor.next(editor, fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should move the cursor from last column to first column in the below row", () => {
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
                    text 2<cursor />
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

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const fakeEvent = { preventDefault: jest.fn() };
    TableCursor.next(editor, fakeEvent, { edge: "right" });

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should move the cursor from last column of the last row to the tables next sibling", () => {
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
                <paragraph />
              </td>
              <td>
                <paragraph>
                  <text>
                    text 1<cursor />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>text 2</paragraph>
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
                <paragraph />
              </td>
              <td>
                <paragraph>
                  <text>text 1</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
        <paragraph>
          text 2<cursor />
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const fakeEvent = { preventDefault: jest.fn() };
    TableCursor.next(editor, fakeEvent, { edge: "right" });

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
