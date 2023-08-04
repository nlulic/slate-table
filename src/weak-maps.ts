import { Editor, Element, NodeEntry } from "slate";
import { WithTableOptions } from "./options";

/** Weak reference between the `Editor` and the `WithTableOptions` */
export const EDITOR_TO_WITH_TABLE_OPTIONS = new WeakMap<
  Editor,
  WithTableOptions
>();

/** Weak reference between the `Editor` and the selected elements */
export const EDITOR_TO_SELECTION = new WeakMap<
  Editor,
  NodeEntry<Element>[][]
>();

/** Weak reference between the `Editor` and a set of the selected elements */
export const EDITOR_TO_SELECTION_SET = new WeakMap<Editor, WeakSet<Element>>();
