import { Editor, Element, Node, Transforms } from "slate";
import { WithTableOptions } from "../options";
import { isElement, isOfType } from "../utils";

export const withNormalization = <T extends Editor>(
  editor: T,
  blocks: WithTableOptions["blocks"]
) => {
  const { normalizeNode } = editor;

  const ALLOWED_TABLE_CHILDREN = [blocks.thead, blocks.tbody, blocks.tfoot];

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (isElement(node) && node.type === blocks.table) {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (isElement(child) && ALLOWED_TABLE_CHILDREN.includes(child.type)) {
          continue;
        }

        const [tbody] = Editor.nodes(editor, {
          match: isOfType(editor, "tbody"),
          at: path,
        });

        if (!tbody) {
          return Transforms.wrapNodes(
            editor,
            {
              type: blocks.tbody,
              children: [child],
            } as Element,
            {
              at: childPath,
            }
          );
        }

        const [tbodyElement, tbodyPath] = tbody;
        const elements = tbodyElement.children.filter(
          (n) => isElement(n) && !editor.isInline(n)
        );

        return Transforms.moveNodes(editor, {
          at: childPath,
          to: [...tbodyPath, elements.length],
        });
      }
    }

    if (isElement(node) && node.type === blocks.thead) {
      // TODO:
    }

    if (isElement(node) && [blocks.tbody, blocks.tfoot].includes(node.type)) {
      // TODO:
    }

    if (isElement(node) && node.type === blocks.content) {
      // TODO:
    }

    normalizeNode(entry);
  };

  return editor;
};
