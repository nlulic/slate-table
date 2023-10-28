/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import normalizeTr from "../../src/normalization/normalize-tr";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { Editor } from "slate";
import { jsx, withTest } from "../testutils";
import { EDITOR_TO_WITH_TABLE_OPTIONS } from "../../src/weak-maps";

describe("normalize `tr` node", () => {
  it("should wrap every inline node in a `content` node", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <text>1</text>
              <th>
                <paragraph>2</paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <text>1</text>
              <td>
                <paragraph>2</paragraph>
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
                <text>1</text>
              </th>
              <th>
                <paragraph>2</paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <text>1</text>
              </td>
              <td>
                <paragraph>2</paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(
      normalizeTr(actual, DEFAULT_WITH_TABLE_OPTIONS.blocks)
    );

    // needed for `isOfType` to work
    EDITOR_TO_WITH_TABLE_OPTIONS.set(editor, DEFAULT_WITH_TABLE_OPTIONS);

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });
});
