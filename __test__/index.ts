import { Editor, Element } from "slate";
import { createHyperscript } from "slate-hyperscript";

export const jsx = createHyperscript({
  elements: {
    table: {
      type: "table",
    },
    tr: {
      type: "table-row",
    },
    td: {
      type: "table-cell",
    },
    paragraph: {
      type: "paragraph",
    },
    inline: { inline: true },
  },
});

export const withTest = (editor: Editor) => {
  const { isInline } = editor;

  editor.isInline = (element: Element & { inline?: boolean }) => {
    return element.inline === true ? true : isInline(element);
  };

  return editor;
};
