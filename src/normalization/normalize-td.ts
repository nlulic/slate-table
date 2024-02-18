import { Editor, Element, Node, Transforms } from "slate";
import { WithTableOptions } from "../options";
import { isElement } from "../utils";

/**
 * Normalizes `th` and `td` nodes by wrapping all nodes inside a `content`
 * node. If nested tables are allowed, the `table` node will also be
 * retained as a valid child.
 */
export function normalizeTd<T extends Editor>(
  editor: T,
  { blocks: { table, th, td, content }, withNestedTables }: WithTableOptions,
): T {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry, options) => {
    const [node, path] = entry;
    if (isElement(node) && [th, td].includes(node.type)) {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (isElement(child) && child.type === content) {
          continue;
        }

        if (withNestedTables && isElement(child) && child.type === table) {
          continue;
        }

        return Transforms.wrapNodes(
          editor,
          {
            type: content,
            children: [child],
          } as Element,
          { at: childPath },
        );
      }
    }

    normalizeNode(entry, options);
  };

  return editor;
}
