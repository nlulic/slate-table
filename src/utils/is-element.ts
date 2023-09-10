import { Editor, Element, Node } from "slate";
import { WithType } from "./types";

export const isElement = <T extends Element>(node: Node): node is WithType<T> =>
  !Editor.isEditor(node) && Element.isElement(node) && "type" in node;
