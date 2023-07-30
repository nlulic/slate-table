import { Editor, Element, Location, Node, NodeEntry } from "slate";
import { WithType, isElement } from "./is-element";
import { isOfType } from "./is-of-type";

export function* matrix(
  editor: Editor,
  options: { at?: Location } = {}
): Generator<NodeEntry<WithType<Element>>[], undefined> {
  const [table] = Editor.nodes(editor, {
    at: options.at,
    match: isOfType(editor, "table"),
  });

  if (!table) {
    return;
  }

  const [, tablePath] = table;

  for (const [, rowPath] of Editor.nodes(editor, {
    at: tablePath,
    match: isOfType(editor, "tr"),
  })) {
    const cells: NodeEntry<WithType<Element>>[] = [];

    for (const [cell, path] of Node.children(editor, rowPath)) {
      if (isElement(cell)) {
        cells.push([cell, path]);
      }
    }

    yield cells;
  }
}
