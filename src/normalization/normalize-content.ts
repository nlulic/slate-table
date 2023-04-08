import { WithTableOptions } from "../options";
import { isElement } from "../utils";
import { type Editor, Node, Transforms } from "slate";

/**
 * Will normalize the `content` node. It will remove
 * table-related elements and unwrap their children.
 */
const normalizeContent = <T extends Editor>(
  editor: T,
  blocks: WithTableOptions["blocks"]
): T => {
  const { normalizeNode } = editor;

  const FORBIDDEN_CHILDREN = new Set([
    blocks.table,
    blocks.thead,
    blocks.tbody,
    blocks.tfoot,
    blocks.td,
    blocks.th,
    blocks.tr,
  ]);

  editor.normalizeNode = ([node, path]) => {
    if (isElement(node) && node.type === blocks.content) {
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
