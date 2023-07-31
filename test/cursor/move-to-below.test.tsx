/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { TableCursor } from "../../src/table-cursor";
import { jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";

describe("move to the below row", () => {
  it("should move the cursor to the cell below", () => {
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

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const fakeEvent = { preventDefault: jest.fn() };
    TableCursor.below(editor, fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should not move the cursor if the cursor is not at the end path of the last text node", () => {
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
                  <text>
                    text 1<cursor />
                  </text>
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
    TableCursor.below(editor, fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(0);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });

  it("should move the cursor from the last row to the tables next sibling", () => {
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
                <paragraph>
                  <text>
                    text
                    <cursor /> 1
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
                <paragraph>
                  <text>text 1</text>
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
        <paragraph>
          text 2<cursor />
        </paragraph>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    const fakeEvent = { preventDefault: jest.fn() };
    TableCursor.below(editor, fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    assert.deepEqual(editor.children, expected.children);
    assert.deepEqual(editor.selection, expected.selection);
  });
});
