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
  isInTable(editor: Editor, options: { at?: Location } = {}): boolean {
    const [table] = Editor.nodes(editor, {
      match: isOfType(editor, "table"),
      at: options.at,
    });

    return !!table;
  },
  /**
   * Insert a table at the specified location with the specified number of rows. If no location
   * is specified it will be inserted at the current selection.
   * @param options The options for the table insertion. The `rows` and `cols` specify the number
   * of rows and columns in the table, if not provided, they default to 2. The `at` property can be
   * used to optionally specifiy the location at which to insert the table.
   * @returns void
   */
  insertTable(editor: Editor, options: Partial<InsertTableOptions> = {}): void {
    const editorOptions = EDITOR_TO_WITH_TABLE_OPTIONS.get(editor);

    if (!editorOptions) {
      return;
    }

    const {
      blocks: { content, table, tbody, td, tr },
    } = editorOptions;

    const { rows, cols, at } = { ...DEFAULT_INSERT_TABLE_OPTIONS, ...options };

    if (this.isInTable(editor, { at })) {
      return;
    }

    // number of rows and cols can't be less than 1
    const sanitize = (n: number) => (n < 1 ? 1 : n);

    Transforms.insertNodes(
      editor,
      {
        type: table,
        children: [
          {
            type: tbody,
            children: Array.from({ length: sanitize(rows) }).map<Node>(() => ({
              type: tr,
              children: Array.from({ length: sanitize(cols) }).map<Node>(
                () => ({
                  type: td,
                  children: [
                    {
                      type: content,
                      children: [{ text: "" }],
                    },
                  ],
                })
              ),
            })),
          } as Node,
        ],
      } as Node,
      { at }
    );
  },
  /**
   * Removes a table at the specified location. If no location is specified
   * it will remove the table at the current selection.
   * @returns void
   */
  removeTable(editor: Editor, options: { at?: Location } = {}): void {
    const [table] = Editor.nodes(editor, {
      match: isOfType(editor, "table"),
      at: options.at,
    });

    if (!table) {
      return;
    }

    const [, path] = table;

    Transforms.removeNodes(editor, { at: path });
    Transforms.collapse(editor);
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
