import { Editor, Element, Node, Transforms } from "slate";
import { WithTableOptions } from "../options";
import { isElement, isOfType } from "../utils";

/**
 * Will normalize the `tr` node. It will wrap every node inside
 * a `td` or a `th` if the row is inside the `thead` section.
 */
const normalizeTr = <T extends Editor>(
  editor: T,
  blocks: WithTableOptions["blocks"]
): T => {
  const { normalizeNode } = editor;

  const { tr, td, th } = blocks;

  editor.normalizeNode = ([node, path]) => {
    if (isElement(node) && node.type === tr) {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (!isElement(child) || (child.type !== td && child.type !== th)) {
          const [thead] = Editor.nodes(editor, {
            match: isOfType(editor, "thead"),
            at: path,
          });

          Transforms.wrapNodes(
            editor,
            {
              type: thead ? th : td,
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

export default normalizeTr;
