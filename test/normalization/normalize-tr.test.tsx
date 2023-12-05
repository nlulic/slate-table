/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { EDITOR_TO_WITH_TABLE_OPTIONS } from "../../src/weak-maps";
import { Editor } from "slate";
import { jsx, withTest } from "../testutils";
import { normalizeTr } from "../../src/normalization/normalize-tr";

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

    const editor = withTest(normalizeTr(actual, DEFAULT_WITH_TABLE_OPTIONS));

    // needed for `isOfType` to work
    EDITOR_TO_WITH_TABLE_OPTIONS.set(editor, DEFAULT_WITH_TABLE_OPTIONS);

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });
});
