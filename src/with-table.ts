import { EDITOR_TO_WITH_TABLE_OPTIONS } from "./weak-maps";
import { Editor } from "slate";
import { WithTableOptions, DEFAULT_WITH_TABLE_OPTIONS } from "./options";
import { withNormalization } from "./normalization";

export const withTable = <T extends Editor>(
  editor: T,
  options: Partial<WithTableOptions>
): T => {
  const optionsWithDefaults: WithTableOptions = {
    blocks: { ...DEFAULT_WITH_TABLE_OPTIONS.blocks, ...options.blocks },
  };

  EDITOR_TO_WITH_TABLE_OPTIONS.set(editor, optionsWithDefaults);

  editor = withNormalization(editor, optionsWithDefaults.blocks);

  return editor;
};
