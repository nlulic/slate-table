import { type Editor } from "slate";
import { Options } from "./options";

/** Weak reference between the `Editor` and the slate-table `Options` */
export const EDITOR_TO_OPTIONS = new WeakMap<Editor, Options>();
