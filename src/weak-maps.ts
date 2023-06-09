import { Editor } from "slate";
import { WithTableOptions } from "./options";

/** Weak reference between the `Editor` and the `WithTableOptions` */
export const EDITOR_TO_WITH_TABLE_OPTIONS = new WeakMap<
  Editor,
  WithTableOptions
>();
