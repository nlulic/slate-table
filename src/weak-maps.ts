import { type Editor } from "slate";
import { WithTableOptions } from "./options";

/** Weak reference between the `Editor` and the slate-table `Options` */
export const EDITOR_TO_WITH_TABLE_OPTIONS = new WeakMap<
  Editor,
  WithTableOptions
>();
