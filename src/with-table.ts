import { EDITOR_TO_WITH_TABLE_OPTIONS } from "./weak-maps";
import { WithTableOptions, DEFAULT_WITH_TABLE_OPTIONS } from "./options";
import { mergeDeep } from "./utils";
import { type Editor } from "slate";

export const withTable = <T extends Editor>(
  editor: T,
  options: WithTableOptions
): T => {
  EDITOR_TO_WITH_TABLE_OPTIONS.set(
    editor,
    mergeDeep(DEFAULT_WITH_TABLE_OPTIONS, options)
  );

  return editor;
};
