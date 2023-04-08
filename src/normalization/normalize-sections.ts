import { type Editor } from "slate";

// TODO:
const normalizeSections = <T extends Editor>(editor: T): T => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    normalizeNode(entry);
  };

  return editor;
};

export default normalizeSections;
