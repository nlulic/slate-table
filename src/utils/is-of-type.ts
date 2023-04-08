import { EDITOR_TO_WITH_TABLE_OPTIONS } from "../weak-maps";
import { Editor, Element, Node, NodeMatch } from "slate";
import { WithTableOptions } from "../options";
import { isElement, WithType } from "./is-element";

/** @returns a `NodeMatch` function which is used to match the elements of a specific `type`. */
export const isOfType = (
  editor: Editor,
  ...types: Array<keyof WithTableOptions["blocks"]>
): NodeMatch<WithType<Element>> | undefined => {
  const options = EDITOR_TO_WITH_TABLE_OPTIONS.get(editor),
    elementTypes = types.map((type) => options?.blocks?.[type]);

  return (node: Node): boolean =>
    isElement(node) && elementTypes.includes(node.type);
};
