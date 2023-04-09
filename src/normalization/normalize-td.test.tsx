/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import normalizeTd from "./normalize-td";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../options";
import { Editor } from "slate";
import { jsx, withTest } from "../../test";

describe("normalize `td` and `th` nodes", () => {
  it("should wrap every inline node in a `content` node", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>1</paragraph>
                <inline>2</inline>
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
                <paragraph>1</paragraph>
                <paragraph>
                  <text />
                  <inline>2</inline>
                  <text />
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(
      normalizeTd(actual, DEFAULT_WITH_TABLE_OPTIONS.blocks)
    );

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });
});
