import { WithTableOptions } from "../options";
import { isElement } from "../utils";
import { Editor, Node, Transforms } from "slate";

/**
 * Will normalize the `content` node. It will remove
 * table-related elements and unwrap their children.
 */
const normalizeContent = <T extends Editor>(
  editor: T,
  blocks: WithTableOptions["blocks"]
): T => {
  const { normalizeNode } = editor;

  const { content, table, tbody, td, tfoot, th, thead, tr } = blocks;

  const FORBIDDEN_CHILDREN = new Set([
    table,
    thead,
    tbody,
    tfoot,
    tr,
    th,
    td,
    content,
  ]);

  editor.normalizeNode = ([node, path]) => {
    if (isElement(node) && node.type === content) {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (isElement(child) && FORBIDDEN_CHILDREN.has(child.type)) {
          Transforms.unwrapNodes(editor, { at: childPath });
          return;
        }
      }
    }

    normalizeNode([node, path]);
  };

  return editor;
};

export default normalizeContent;
