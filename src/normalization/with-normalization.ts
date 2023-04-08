import normalizeContent from "./normalize-content";
import normalizeSections from "./normalize-sections";
import normalizeTable from "./normalize-table";
import normalizeTd from "./normalize-td";
import normalizeTr from "./normalize-tr";
import { Editor } from "slate";
import { WithTableOptions } from "../options";

export const withNormalization = <T extends Editor>(
  editor: T,
  blocks: WithTableOptions["blocks"]
): T => {
  // normalize elements bottom up
  editor = normalizeTable(editor, blocks);
  editor = normalizeSections(editor);
  editor = normalizeTr(editor);
  editor = normalizeTd(editor);
  editor = normalizeContent(editor, blocks);

  return editor;
};