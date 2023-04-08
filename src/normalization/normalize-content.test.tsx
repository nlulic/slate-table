/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import normalizeContent from "./normalize-content";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../options";
import { Editor } from "slate";
import { jsx, withTest } from "../../test";

describe("normalize `content` node", () => {
  it("should remove other table nodes from content", () => {
    const actual = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <paragraph>1</paragraph>
                  <table>2</table>
                  <thead>3</thead>
                  <tbody>4</tbody>
                  <tfoot>5</tfoot>
                  <tr>6</tr>
                  <td>7</td>
                  <th>
                    <paragraph>8</paragraph>
                  </th>
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
                  <paragraph>1</paragraph>
                  <paragraph>8</paragraph>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(
      normalizeContent(actual, DEFAULT_WITH_TABLE_OPTIONS.blocks)
    );

    Editor.normalize(editor, { force: true });

    assert.deepEqual(editor.children, expected.children);
  });
});