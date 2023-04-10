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
  editor = normalizeSections(editor, blocks);
  editor = normalizeTr(editor, blocks);
  editor = normalizeTd(editor, blocks);
  editor = normalizeContent(editor, blocks);

  return editor;
};
