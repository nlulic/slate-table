import { EDITOR_TO_WITH_TABLE_OPTIONS } from "./weak-maps";
import { Editor } from "slate";
import { WithTableOptions, DEFAULT_WITH_TABLE_OPTIONS } from "./options";
import { withDelete } from "./with-delete";
import { withInsertText } from "./with-insert-text";
import { withNormalization } from "./normalization";
import { withSelection, withSelectionAdjustment } from "./selection";

export function withTable<T extends Editor>(
  editor: T,
  options: Partial<WithTableOptions>
): T {
  const optionsWithDefaults: WithTableOptions = {
    ...DEFAULT_WITH_TABLE_OPTIONS,
    ...options,
  };

  EDITOR_TO_WITH_TABLE_OPTIONS.set(editor, optionsWithDefaults);

  editor = withNormalization(editor, optionsWithDefaults);
  editor = withSelection(editor, optionsWithDefaults);
  editor = withSelectionAdjustment(editor, optionsWithDefaults);
  editor = withDelete(editor, optionsWithDefaults);
  editor = withInsertText(editor);

  return editor;
}
