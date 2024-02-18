/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import {
  DEFAULT_WITH_TABLE_OPTIONS,
  WithTableOptions,
} from "../../src/options";
import { Editor } from "slate";
import { jsx, withTest } from "../testutils";
import { normalizeTd } from "../../src/normalization/normalize-td";

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
                <text>3</text>
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
                <paragraph>
                  <text>3</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(normalizeTd(actual, DEFAULT_WITH_TABLE_OPTIONS));

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });

  it("should wrap the `table` node in a `content` node if nested tables are disabled", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>1</paragraph>
                <table>
                  <text />
                </table>
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
                  <table>
                    <text />
                  </table>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(normalizeTd(actual, DEFAULT_WITH_TABLE_OPTIONS));

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });

  it("should not wrap the `table` node in a `content` node if nested tables are enabled", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>1</paragraph>
                <table>
                  <text />
                </table>
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
                <table>
                  <text />
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const options: WithTableOptions = {
      ...DEFAULT_WITH_TABLE_OPTIONS,
      withNestedTables: true,
    };

    const editor = withTest(normalizeTd(actual, options));

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });
});
