import { Editor, Element, Node, NodeEntry, Path, Transforms } from "slate";
import { WithTableOptions } from "../options";
import { isElement, isOfType } from "../utils";

/**
 * Normalizes the given `table` node by wrapping invalid
 * nodes into a `tbody`.
 */
function normalizeTable<T extends Editor>(
  editor: T,
  { table, thead, tbody, tfoot }: WithTableOptions["blocks"]
): T {
  const ALLOWED_CHILDREN = new Set([thead, tbody, tfoot]);

  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (isElement(node) && node.type === table) {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (isElement(child) && ALLOWED_CHILDREN.has(child.type)) {
          continue;
        }

        const tbodyEntry = immediateTbody(editor, path);

        if (!tbodyEntry) {
          Transforms.wrapNodes(
            editor,
            {
              type: tbody,
              children: [child],
            } as Element,
            { at: childPath }
          );
          return;
        }

        const [tbodyElement, tbodyPath] = tbodyEntry;

        const elements = tbodyElement.children.filter(
          (n) => isElement(n) && !editor.isInline(n)
        );

        Transforms.moveNodes(editor, {
          at: childPath,
          to: [...tbodyPath, elements.length],
        });
        return;
      }
    }

    normalizeNode(entry);
  };

  return editor;
}

/**
 * @returns {NodeEntry<Element> | undefined} The immediate child `tbody` element of the `table`, or `undefined` if it does not exist.
 */
const immediateTbody = (
  editor: Editor,
  tablePath: Path
): NodeEntry<Element> | undefined => {
  const [tbody] = Editor.nodes(editor, {
    match: isOfType(editor, "tbody"),
    at: tablePath,
  });

  if (!tbody) {
    return undefined;
  }

  const [, path] = tbody;

  if (!Path.isChild(path, tablePath)) {
    return undefined;
  }

  return tbody;
};

export default normalizeTable;
