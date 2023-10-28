/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import normalizeSections from "../../src/normalization/normalize-sections";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { Editor } from "slate";
import { jsx, withTest } from "../testutils";

describe("normalize `thead`, `tbody` and `tfoot` nodes", () => {
  it("should wrap every node in a `tr` node", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <text>1</text>
            <inline>2</inline>
          </thead>
          <tbody>
            <paragraph>3</paragraph>
          </tbody>
          <tfoot>
            <td>
              <paragraph>4</paragraph>
            </td>
            <tr>
              <paragraph>5</paragraph>
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
              <text>1</text>
            </tr>
            <tr>
              <text />
              <inline>2</inline>
              <text />
            </tr>
          </thead>
          <tbody>
            <tr>
              <paragraph>3</paragraph>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <paragraph>4</paragraph>
              </td>
            </tr>
            <tr>
              <paragraph>5</paragraph>
            </tr>
          </tfoot>
        </table>
      </editor>
    );

    const editor = withTest(
      normalizeSections(actual, DEFAULT_WITH_TABLE_OPTIONS.blocks)
    );

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });
});
