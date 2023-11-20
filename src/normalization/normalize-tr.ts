import { Editor, Element, Node, Transforms } from "slate";
import { WithTableOptions } from "../options";
import { isElement, isOfType } from "../utils";

/**
 * Normalizes the `tr` node by wrapping each of its child nodes within a td or th
 * element, depending on whether the row is inside the thead section or not.
 */
function normalizeTr<T extends Editor>(
  editor: T,
  { tr, td, th }: WithTableOptions["blocks"]
): T {
  const { normalizeNode } = editor;

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
}

export default normalizeTr;
