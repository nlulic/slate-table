/** @jsxRuntime classic */
/** @jsx jsx */

import { TableCursor } from "../../src/table-cursor";
import { jsx, withTest, DEFAULT_TEST_WITH_TABLE_OPTIONS } from "../index";
import { withTable } from "../../src/with-table";

describe("cursor position", () => {
  /*
   * Actual:
   * +---+---+---+
   * | 1*| 2 | 3 |
   * +---+---+---+
   * | 4 | 5 | 6 |
   * +---+---+---+
   */
  it("should check if cursor is in first cell and row", () => {
    const state = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>
                    1<cursor />
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(state, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    expect(TableCursor.isInFirstCell(editor)).toBe(true);
    expect(TableCursor.isInFirstRow(editor)).toBe(true);

    expect(TableCursor.isInLastCell(editor)).toBe(false);
    expect(TableCursor.isInLastRow(editor)).toBe(false);
  });

  /*
   * Actual:
   * +---+---+---+
   * | 1 | 2*| 3 |
   * +---+---+---+
   * | 4 | 5 | 6 |
   * +---+---+---+
   */
  it("should check if cursor is in first row", () => {
    const state = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>
                    2<cursor />
                  </text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(state, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    expect(TableCursor.isInFirstCell(editor)).toBe(false);
    expect(TableCursor.isInFirstRow(editor)).toBe(true);

    expect(TableCursor.isInLastCell(editor)).toBe(false);
    expect(TableCursor.isInLastRow(editor)).toBe(false);
  });

  /*
   * Actual:
   * +---+---+---+
   * | 1 | 2 | 3 |
   * +---+---+---+
   * | 4 | 5 | 6*|
   * +---+---+---+
   */
  it("should check if cursor is in last cell and row", () => {
    const state = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>5</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    6<cursor />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(state, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    expect(TableCursor.isInFirstCell(editor)).toBe(false);
    expect(TableCursor.isInFirstRow(editor)).toBe(false);

    expect(TableCursor.isInLastCell(editor)).toBe(true);
    expect(TableCursor.isInLastRow(editor)).toBe(true);
  });

  /*
   * Actual:
   * +---+---+---+
   * | 1 | 2 | 3 |
   * +---+---+---+
   * | 4 | 5*| 6 |
   * +---+---+---+
   */
  it("should check if cursor is in last row", () => {
    const state = (
      <editor>
        <table>
          <thead>
            <tr>
              <th>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </th>
              <th>
                <paragraph>
                  <text>3</text>
                </paragraph>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>4</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    5<cursor />
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>6</text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(state, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    expect(TableCursor.isInFirstCell(editor)).toBe(false);
    expect(TableCursor.isInFirstRow(editor)).toBe(false);

    expect(TableCursor.isInLastCell(editor)).toBe(false);
    expect(TableCursor.isInLastRow(editor)).toBe(true);
  });

  /*
   * Actual:
   * +---+---+---+
   * | 1*| 2 | 3 |
   * +---+---+---+
   */
  it("should check if the cursor is in the first and last row when there's only one row.", () => {
    const state = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    2<cursor />
                  </text>
                </paragraph>
              </td>
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

    const editor = withTest(withTable(state, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    expect(TableCursor.isInFirstRow(editor)).toBe(true);
    expect(TableCursor.isInLastRow(editor)).toBe(true);
  });

  /*
   * Actual:
   * +---+---+---+
   * |<1 | 2 | 3>|
   * +---+---+---+
   */
  it("should check if the cursor when the selection is a range", () => {
    const state = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>
                    <anchor />1
                  </text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    3<focus />
                  </text>
                </paragraph>
              </td>
            </tr>
          </tbody>
        </table>
      </editor>
    );

    const editor = withTest(withTable(state, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    expect(TableCursor.isInFirstRow(editor)).toBe(true);
    expect(TableCursor.isInLastRow(editor)).toBe(true);
    expect(TableCursor.isInFirstCell(editor)).toBe(true);
    expect(TableCursor.isInLastCell(editor)).toBe(true);

    expect(TableCursor.isOnEdge(editor, "top")).toBe(true);
    expect(TableCursor.isOnEdge(editor, "bottom")).toBe(true);
    expect(TableCursor.isOnEdge(editor, "start")).toBe(true);
    expect(TableCursor.isOnEdge(editor, "end")).toBe(true);
  });

  it("should check if cursor is on the top and left edge of the cell's content", () => {
    const state = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>
                    <cursor />2
                  </text>
                </paragraph>
                <paragraph>
                  <text>2.2</text>
                </paragraph>
              </td>
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

    const editor = withTest(withTable(state, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    expect(TableCursor.isOnEdge(editor, "start")).toBe(true);
    expect(TableCursor.isOnEdge(editor, "top")).toBe(true);

    expect(TableCursor.isOnEdge(editor, "end")).toBe(false);
    expect(TableCursor.isOnEdge(editor, "bottom")).toBe(false);
  });

  it("should check if cursor is on the bottom and right edge of the cell's content", () => {
    const state = (
      <editor>
        <table>
          <tbody>
            <tr>
              <td>
                <paragraph>
                  <text>1</text>
                </paragraph>
              </td>
              <td>
                <paragraph>
                  <text>2</text>
                </paragraph>
                <paragraph>
                  <text>
                    2.2
                    <cursor />
                  </text>
                </paragraph>
              </td>
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

    const editor = withTest(withTable(state, DEFAULT_TEST_WITH_TABLE_OPTIONS));

    expect(TableCursor.isOnEdge(editor, "start")).toBe(false);
    expect(TableCursor.isOnEdge(editor, "top")).toBe(false);

    expect(TableCursor.isOnEdge(editor, "end")).toBe(true);
    expect(TableCursor.isOnEdge(editor, "bottom")).toBe(true);
  });
});
