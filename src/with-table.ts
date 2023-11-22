import { EDITOR_TO_WITH_TABLE_OPTIONS } from "./weak-maps";
import { Editor } from "slate";
import { WithTableOptions, DEFAULT_WITH_TABLE_OPTIONS } from "./options";
import { withDelete } from "./with-delete";
import { withInsertText } from "./with-insert-text";
import { withNormalization } from "./normalization";
import { withSelection, withSelectionAdjustment } from "./selection";

type Options = Partial<
  { blocks: Partial<WithTableOptions["blocks"]> } & Omit<
    Partial<WithTableOptions>,
    "blocks"
  >
>;

/** The `withTable` plugin adds table specific behaviors to the editor. */
export function withTable<T extends Editor>(editor: T, options: Options): T {
  const { blocks, ...rest } = DEFAULT_WITH_TABLE_OPTIONS;

  const optionsWithDefaults = {
    ...rest,
    ...options,
    blocks: {
      ...blocks,
      ...options.blocks,
    },
  } satisfies WithTableOptions;

  EDITOR_TO_WITH_TABLE_OPTIONS.set(editor, optionsWithDefaults);

  editor = withDelete(editor, optionsWithDefaults);
  editor = withInsertText(editor, optionsWithDefaults);
  editor = withNormalization(editor, optionsWithDefaults);
  editor = withSelection(editor, optionsWithDefaults);
  editor = withSelectionAdjustment(editor, optionsWithDefaults);

  return editor;
}
