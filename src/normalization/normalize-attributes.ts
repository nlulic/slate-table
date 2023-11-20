import { CellElement } from "../utils/types";
import { Editor, Transforms } from "slate";
import { WithTableOptions } from "../options";
import { isElement } from "../utils";

/**
 * Normalizes the `rowspan` and `colspan` attributes of the `td` elements
 * by removing the attributes when their values is equal to 1.
 */
function normalizeAttributes<T extends Editor>(
  editor: T,
  { td, th }: WithTableOptions["blocks"]
) {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (
      isElement<CellElement>(node) &&
      (node.type === th || node.type === td)
    ) {
      const { rowSpan, colSpan } = node;

      if (rowSpan === 1 || colSpan === 1) {
        const attributes: Array<keyof typeof node> = ["rowSpan", "colSpan"];

        return Transforms.unsetNodes(
          editor,
          attributes.filter((attr) => node[attr] === 1),
          { at: path }
        );
      }
    }

    normalizeNode([node, path]);
  };

  return editor;
}

export default normalizeAttributes;
