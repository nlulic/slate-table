import { Editor } from "slate";

export const withTable = <T extends Editor>(editor: T) => {
  return editor;
};
