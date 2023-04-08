import { Editor, Element, Node } from "slate";

export type WithType<T> = T & Record<"type", unknown>;

export const isElement = (node: Node): node is WithType<Element> =>
  !Editor.isEditor(node) && Element.isElement(node) && "type" in node;
