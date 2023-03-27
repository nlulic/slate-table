import { EDITOR_TO_OPTIONS } from "./weak-maps";
import { Options, DEFAULT_OPTIONS } from "./options";
import { mergeDeep } from "./utils";
import { type Editor } from "slate";

export const withTable = <T extends Editor>(editor: T, options: Options): T => {
  EDITOR_TO_OPTIONS.set(editor, mergeDeep(DEFAULT_OPTIONS, options));

  return editor;
};
