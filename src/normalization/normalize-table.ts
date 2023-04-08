import { Editor, Element, Node, Transforms, Path } from "slate";
import { WithTableOptions } from "../options";
import { isElement, isOfType } from "../utils";

/**
 * Will normalize the `table` element.
 */
const normalizeTable = <T extends Editor>(
  editor: T,
  blocks: WithTableOptions["blocks"]
): T => {
  const ALLOWED_TABLE_CHILDREN = [blocks.thead, blocks.tbody, blocks.tfoot];

  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (isElement(node) && node.type === blocks.table) {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (isElement(child) && ALLOWED_TABLE_CHILDREN.includes(child.type)) {
          continue;
        }

        // todo: only immediate children?
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

        // remove tbody if it is not an immediate child of table
        if (!Path.isChild(tbodyPath, path)) {
          return Transforms.unwrapNodes(editor, {
            at: tbodyPath,
          });
        }

        const elements = tbodyElement.children.filter(
          (n) => isElement(n) && !editor.isInline(n)
        );

        return Transforms.moveNodes(editor, {
          at: childPath,
          to: [...tbodyPath, elements.length],
        });
      }
    }

    return normalizeNode(entry);
  };

  return editor;
};

export default normalizeTable;
