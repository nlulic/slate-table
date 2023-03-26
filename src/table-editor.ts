import { Config } from "./config";
import { EDITOR_TO_OPTIONS } from "./with-table";
import { Editor, Element, Node, NodeMatch } from "slate";

export const TableEditor = {
  /**
   * Checks if the current selection is inside a table.
   * @returns `true` if the selection is inside a table, `false` otherwise.
   */
  isInTable(editor: Editor): boolean {
    const [table] = Editor.nodes(editor, {
      match: isOfType(editor, "table"),
    });

    return !!table;
  },
};

/** `isOfType` returns a `NodeMatch` function which is used to match the element of a specific `type`. */
const isOfType = (
  editor: Editor,
  type: keyof Config["blocks"]
): NodeMatch<Node> | undefined => {
  const options = EDITOR_TO_OPTIONS.get(editor);
  const elementType = options?.blocks?.[type];

  return (node: Node) =>
    !Editor.isEditor(node) &&
    Element.isElement(node) &&
    "type" in node &&
    node.type === elementType;
};
