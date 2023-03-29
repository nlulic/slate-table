import {
  DEFAULT_INSERT_TABLE_OPTIONS,
  InsertTableOptions,
  WithTableOptions,
} from "./options";
import { EDITOR_TO_WITH_TABLE_OPTIONS } from "./weak-maps";
import { Editor, Element, Location, Node, NodeMatch, Transforms } from "slate";

export const TableEditor = {
  /**
   * Checks if the current selection is inside a table.
   * @returns `true` if the selection is inside a table, `false` otherwise.
   */
  isInTable(editor: Editor, at?: Location): boolean {
    const [table] = Editor.nodes(editor, {
      match: isOfType(editor, "table"),
      at,
    });

    return !!table;
  },
  /**
   * Insert a table at the specified location with the specified number of rows. If no location
   * is specified it will be inserted at the current selection.
   * @param options The options for the table insertion. The `rows` and `cols` specify the number
   * of rows and columns in the table, if not provided, they default to 4. The `at` property can be
   * used to optionally specifiy the location at which to insert the table.
   * @returns void
   */
  insertTable(editor: Editor, options: Partial<InsertTableOptions> = {}): void {
    if (!EDITOR_TO_WITH_TABLE_OPTIONS.has(editor)) {
      return;
    }

    const {
      blocks: { cell, content, row, table },
    } = EDITOR_TO_WITH_TABLE_OPTIONS.get(editor)!;

    const { rows, cols, at } = { ...DEFAULT_INSERT_TABLE_OPTIONS, ...options };

    if (this.isInTable(editor, at)) {
      return;
    }

    // number of rows and cols can't be less than 1
    const sanitize = (n: number) => (n < 1 ? 1 : n);

    Transforms.insertNodes(
      editor,
      {
        type: table,
        children: Array.from({ length: sanitize(rows) }).map<Node>(() => ({
          type: row,
          children: Array.from({ length: sanitize(cols) }).map<Node>(() => ({
            type: cell,
            children: [
              {
                type: content,
                children: [{ text: "" }],
              },
            ],
          })),
        })),
      } as Node,
      { at }
    );
  },
};

/** @returns a `NodeMatch` function which is used to match the element of a specific `type`. */
const isOfType = (
  editor: Editor,
  type: keyof WithTableOptions["blocks"]
): NodeMatch<Node> | undefined => {
  const options = EDITOR_TO_WITH_TABLE_OPTIONS.get(editor);
  const elementType = options?.blocks?.[type];

  return (node: Node) =>
    !Editor.isEditor(node) &&
    Element.isElement(node) &&
    "type" in node &&
    node.type === elementType;
};
