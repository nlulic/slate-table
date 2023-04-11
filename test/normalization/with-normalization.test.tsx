/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { Editor } from "slate";
import { jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";

describe("withNormalization", () => {
  it("should normalize table with missing tbody", () => {
    const actual = (
      <editor>
        <table>
          <tr>
            <td>
              <paragraph>
                <text />
              </paragraph>
            </td>
          </tr>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
          <tbody>
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

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });

  it("should normalize table by moving children into an existing tbody", () => {
    const actual = (
      <editor>
        <table>
          <tr>
            <td>
              <paragraph>
                <text>2</text>
              </paragraph>
            </td>
          </tr>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>1</text>
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
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });

  it("should normalize table by moving children into an existing tbody in the correct order", () => {
    const actual = (
      <editor>
        <table>
          <paragraph>
            <text>1</text>
          </paragraph>
          <paragraph>
            <text>2</text>
          </paragraph>
          <paragraph>
            <text>3</text>
          </paragraph>
          <tbody></tbody>
        </table>
      </editor>
    );

    const expected = (
      <editor>
        <table>
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
                  <text>1</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
            </tr>
            <tr>
              <td>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });

  it("should normalize table with missing row", () => {
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
            </tr>
          </thead>
          <tbody>
            <td>
              <paragraph>
                <text />
              </paragraph>
            </td>
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
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });

  it("should normalize table with missing cells", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <paragraph>
                <text />
              </paragraph>
            </tr>
          </thead>
          <tbody>
            <tr>
              <paragraph>
                <text />
              </paragraph>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <paragraph>
                <text />
              </paragraph>
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
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph>
                  <text />
                </paragraph>
              </td>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });

  it("should normalize table with missing content wrapper", () => {
    const actual = (
      <editor>
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
        <table>
          <tbody>
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

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });
});
