import { Editor } from "slate";
import { Format } from "../types";
import { isMarkActive } from "./is-mark-active";

export function toggleMark(editor: Editor, format: Format) {
  if (isMarkActive(editor, format)) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}
