import { Editor, Element, Node, Text, Transforms } from "slate";
import { WithTableOptions } from "../options";
import { isElement } from "../utils";

/**
 * Normalizes the given `td` (and `th`) node by wrapping every inline
 * and text node inside a `content` node.
 */
const normalizeTd = <T extends Editor>(
  editor: T,
  { content, td, th }: WithTableOptions["blocks"]
): T => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (isElement(node) && (node.type === th || node.type === td)) {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (Text.isText(child) || Editor.isInline(editor, child)) {
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
