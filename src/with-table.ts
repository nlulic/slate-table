import { EDITOR_TO_WITH_TABLE_OPTIONS } from "./weak-maps";
import { Editor } from "slate";
import { WithTableOptions, DEFAULT_WITH_TABLE_OPTIONS } from "./options";
import { withNormalization } from "./normalization";

export const withTable = <T extends Editor>(
  editor: T,
  options: Partial<WithTableOptions>
): T => {
  const defaultedOptions: WithTableOptions = {
    ...DEFAULT_WITH_TABLE_OPTIONS,
    ...options,
  };

  EDITOR_TO_WITH_TABLE_OPTIONS.set(editor, defaultedOptions);

  editor = withNormalization(editor, defaultedOptions);

  return editor;
};
