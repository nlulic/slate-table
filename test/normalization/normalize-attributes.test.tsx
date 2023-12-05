/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../../src/options";
import { Editor } from "slate";
import { jsx, withTest } from "../testutils";
import { normalizeAttributes } from "../../src/normalization/normalize-attributes";

describe("normalize attributes of the `td` and `th` nodes", () => {
  it("should remove other table nodes from content", () => {
    const actual = (
      <editor>
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th rowSpan={1} colSpan={1}>
                <paragraph>
                  <text />
                </paragraph>
              </th>
            </tr>
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
              <th colSpan={2}>
                <paragraph>
                  <text />
                </paragraph>
              </th>
            </tr>
            <tr>
              <th colSpan={1}>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th colSpan={1}>
                <paragraph>
                  <text />
                </paragraph>
              </th>
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
              <th rowSpan={2}>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
            </tr>
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
              <th colSpan={2}>
                <paragraph>
                  <text />
                </paragraph>
              </th>
            </tr>
            <tr>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text />
                </paragraph>
              </th>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(
      normalizeAttributes(actual, DEFAULT_WITH_TABLE_OPTIONS)
    );

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });
});
