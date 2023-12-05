/** @jsxRuntime classic */
/** @jsx jsx */

import assert from "assert";
import { DEFAULT_WITH_TABLE_OPTIONS } from "../src/options";
import { jsx, withTest } from "./testutils";
import { withTable } from "../src/with-table";

describe("withFragments", () => {
  describe("getFragment", () => {
    /*
     * Actual:
     * +------+------+
     * |<Pear | Lime |
     * +------+------+
     * | Plum>| Kiwi |
     * +------+------+
     */
    it("should return content fragments when in table", () => {
      const actual = (
        <editor>
          <table>
            <thead>
              <tr>
                <th>
                  <paragraph>
                    <text>
                      <anchor />
                      Pear
                    </text>
                  </paragraph>
                </th>
                <th>
                  <paragraph>
                    <text>Lime</text>
                  </paragraph>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <paragraph>
                    <text>
                      Plum
                      <focus />
                    </text>
                  </paragraph>
                </td>
                <td>
                  <paragraph>
                    <text>Kiwi</text>
                  </paragraph>
                </td>
              </tr>
            </tbody>
          </table>
        </editor>
      );

      const expected = [
        {
          type: "paragraph",
          children: [
            {
              text: "Pear",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Lime",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Plum",
            },
          ],
        },
      ];

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      assert.deepEqual(editor.getFragment(), expected);
    });

    /*
     * Actual:
     * <List:
     * +------+------+
     * | Pear>| Lime |
     * +------+------+
     * | Plum | Kiwi |
     * +------+------+
     */
    it("should return fragments when not in table", () => {
      const actual = (
        <editor>
          <paragraph>
            <text>
              <anchor />
              List:
            </text>
          </paragraph>
          <table>
            <thead>
              <tr>
                <th>
                  <paragraph>
                    <text>
                      Pear
                      <focus />
                    </text>
                  </paragraph>
                </th>
                <th>
                  <paragraph>
                    <text>Lime</text>
                  </paragraph>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <paragraph>
                    <text>Plum</text>
                  </paragraph>
                </td>
                <td>
                  <paragraph>
                    <text>Kiwi</text>
                  </paragraph>
                </td>
              </tr>
            </tbody>
          </table>
        </editor>
      );

      const expected = [
        {
          type: "paragraph",
          children: [
            {
              text: "List:",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Pear",
            },
          ],
        },
      ];

      const editor = withTest(withTable(actual, DEFAULT_WITH_TABLE_OPTIONS));

      assert.deepEqual(editor.getFragment(), expected);
    });
  });
});
