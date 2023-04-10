/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { Editor } from "slate";
import { jsx, withTest } from "../index";
import { withTable } from "../../src/with-table";

describe("normalize table element", () => {
  it("should wrap invalid table children into existing `tbody`", () => {
    const actual = (
      <editor>
        <table>
          <paragraph>
            <text />
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
                {/** TODO: */}
                <text />
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

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });

  it("should wrap invalid table children into existing `tbody` and remove existing inline elements", () => {
    const actual = (
      <editor>
        <table>
          <paragraph>
            <text />
          </paragraph>
          <tbody>
            <inline>1</inline>
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
                {/* TODO */}
                <paragraph>
                  <text />
                  <inline>1</inline>
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

    const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });

  it("should wrap table children into existing `tbody` in the correct order", () => {
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
                {/* TODO: missing content node */}
                <text />
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

  it("should wrap invalid table children into existing `tbody` with multiple children", () => {
    const actual = (
      <editor>
        <table>
          <paragraph>
            <text />
          </paragraph>
          <tbody>
            <tr>
              <text />
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
                {/* TODO: missing content node */}
                <text />
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

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });

  it("should create `tbody` if it doesn't exist and wrap invalid table children into it", () => {
    const actual = (
      <editor>
        <table>
          <paragraph>
            <text />
          </paragraph>
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

  it("should not insert the element into a `tbody` which is not a child of the `table`", () => {
    const actual = (
      <editor>
        <table>
          <paragraph>
            <tbody>
              <text />
            </tbody>
          </paragraph>
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
