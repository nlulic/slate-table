import { Editor, Element, NodeEntry } from "slate";
import { WithTableOptions } from "./options";

/** Weak reference between the `Editor` and the `WithTableOptions` */
export const EDITOR_TO_WITH_TABLE_OPTIONS = new WeakMap<
  Editor,
  WithTableOptions
>();

/** Weak reference between the `Editor` and the table selection */
export const EDITOR_TO_TABLE_SELECTION = new WeakMap<
  Editor,
  NodeEntry<Element>[][]
>();
