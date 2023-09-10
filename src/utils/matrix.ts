import { CellElement } from "./types";
import { Editor, Location, Node, NodeEntry, Span } from "slate";
import { isElement } from "./is-element";
import { isOfType } from "./is-of-type";

export function* matrix(
  editor: Editor,
  options: { at?: Location | Span } = {}
): Generator<NodeEntry<CellElement>[], undefined> {
  const [table] = Editor.nodes(editor, {
    match: isOfType(editor, "table"),
    at: options.at,
  });

  if (!table) {
    return;
  }

  const [, tablePath] = table;

  for (const [, rowPath] of Editor.nodes(editor, {
    at: Span.isSpan(options.at) ? options.at : tablePath,
    match: isOfType(editor, "tr"),
  })) {
    const cells: NodeEntry<CellElement>[] = [];

    for (const [cell, path] of Node.children(editor, rowPath)) {
      if (isElement<CellElement>(cell)) {
        cells.push([cell, path]);
      }
    }

    yield cells;
  }
}
