import { Editor, Element, Node, Transforms } from "slate";
import { WithTableOptions } from "../options";
import { isElement } from "../utils";

/**
 * Will normalize the `td` (and `th`) node. It will wrap every
 * inline node inside a `content` node.
 */
const normalizeTd = <T extends Editor>(
  editor: T,
  blocks: WithTableOptions["blocks"]
): T => {
  const { normalizeNode } = editor;

  const { content, td, th } = blocks;

  editor.normalizeNode = ([node, path]) => {
    if (isElement(node) && (node.type === th || node.type === td)) {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (Editor.isInline(editor, child as Element)) {
          Transforms.wrapNodes(
            editor,
            {
              type: content,
              children: [child],
            } as Element,
            { at: childPath }
          );
          return;
        }
      }
    }

    normalizeNode([node, path]);
  };

  return editor;
};

export default normalizeTd;
