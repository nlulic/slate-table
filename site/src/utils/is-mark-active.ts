import { Editor } from "slate";
import { Format } from "../types";

export function isMarkActive(editor: Editor, format: Format): boolean {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
}
