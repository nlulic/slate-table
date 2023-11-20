import { Editor, Range, Transforms } from "slate";
import { TableCursor } from "./table-cursor";

export function withInsertText<T extends Editor>(editor: T): T {
  const { insertText } = editor;

  editor.insertText = (text, options) => {
    const { selection } = editor;

    if (
      selection &&
      Range.isExpanded(selection) &&
      TableCursor.isInTable(editor, { at: selection })
    ) {
      Transforms.collapse(editor, { edge: "focus" });
    }

    insertText(text, options);
  };

  return editor;
}
