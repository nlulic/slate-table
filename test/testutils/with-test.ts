import { Editor, Element } from "slate";

export const withTest = (editor: Editor) => {
  const { isInline } = editor;

  editor.isInline = (element: Element & { inline?: boolean }) => {
    return element.inline === true ? true : isInline(element);
  };

  return editor;
};
