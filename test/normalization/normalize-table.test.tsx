/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { EDITOR_TO_WITH_TABLE_OPTIONS } from "../../src/weak-maps";
import { Editor } from "slate";
import { jsx, withTest } from "../testutils";
import { normalizeTable } from "../../src/normalization/normalize-table";

describe("normalize `table` node", () => {
  it("should wrap invalid nodes into a `tbody` node", () => {
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

    const editor = withTest(normalizeTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    EDITOR_TO_WITH_TABLE_OPTIONS.set(editor, DEFAULT_WITH_TABLE_OPTIONS);

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });

  it("should wrap invalid nodes into an existing `tbody`", () => {
    const actual = (
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
          <tr>
            <tbody>
              <tr>
                <text />
              </tr>
            </tbody>
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
            <tr>
              <tbody>
                <tr>
                  <text />
                </tr>
              </tbody>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(normalizeTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

    EDITOR_TO_WITH_TABLE_OPTIONS.set(editor, DEFAULT_WITH_TABLE_OPTIONS);

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });
});
