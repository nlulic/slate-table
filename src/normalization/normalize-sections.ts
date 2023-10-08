import { Editor, Element, Node, Transforms } from "slate";
import { WithTableOptions } from "../options";
import { isElement } from "../utils";

/**
 * Normalizes the `thead`, `tbody` and `tfoot` nodes by wrapping each of its
 * child nodes within a `tr` element.
 */
const normalizeSections = <T extends Editor>(
  editor: T,
  { thead, tbody, tfoot, tr }: WithTableOptions["blocks"]
): T => {
  const { normalizeNode } = editor;

  const SECTIONS = [thead, tbody, tfoot];

  editor.normalizeNode = ([node, path]) => {
    if (isElement(node) && SECTIONS.includes(node.type)) {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (!isElement(child) || child.type !== tr) {
          Transforms.wrapNodes(
            editor,
            {
              type: tr,
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

export default normalizeSections;
