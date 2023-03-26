import { Editor } from "slate";
import { mergeDeep } from "./utils";
import { Config, DEFAULT_OPTIONS } from "./config";

export const EDITOR_TO_OPTIONS = new WeakMap<Editor, Config>();

export const withTable = <T extends Editor>(editor: T, config: Config): T => {
  EDITOR_TO_OPTIONS.set(editor, mergeDeep(DEFAULT_OPTIONS, config));

  return editor;
};
