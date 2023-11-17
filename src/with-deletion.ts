import { Editor, Point, Range, Transforms } from "slate";
import { isOfType } from "./utils";

export const withDeletion = <T extends Editor>(editor: T): T => {
  const { deleteBackward, deleteForward } = editor;

  editor.deleteBackward = (unit) => {
    const { selection } = editor;

    if (!selection || !Range.isCollapsed(selection)) {
      return deleteBackward(unit);
    }

    const [td] = Editor.nodes(editor, {
      match: isOfType(editor, "th", "td"),
      at: selection,
    });

    const before = Editor.before(editor, selection, { unit });
    const [tdBefore] = before
      ? Editor.nodes(editor, {
          match: isOfType(editor, "th", "td"),
          at: before,
        })
      : [undefined];

    if (!td && !tdBefore) {
      return deleteBackward(unit);
    }

    if (!td && tdBefore && before) {
      return Transforms.select(editor, before);
    }

    const [, tdPath] = td;
    const start = Editor.start(editor, tdPath);

    if (Point.equals(selection.anchor, start)) {
      return;
    }

    deleteBackward(unit);
  };

  editor.deleteForward = (unit) => {
    const { selection } = editor;

    if (!selection || !Range.isCollapsed(selection)) {
      return deleteForward(unit);
    }

    const [td] = Editor.nodes(editor, {
      match: isOfType(editor, "th", "td"),
      at: selection,
    });

    const after = Editor.after(editor, selection, { unit });
    const [tdAfter] = after
      ? Editor.nodes(editor, { match: isOfType(editor, "th", "td"), at: after })
      : [undefined];

    if (!td && !tdAfter) {
      return deleteForward(unit);
    }

    if (!td && tdAfter && after) {
      return Transforms.select(editor, after);
    }

    const [, tdPath] = td;
    const end = Editor.end(editor, tdPath);

    if (Point.equals(selection.anchor, end)) {
      return;
    }

    deleteForward(unit);
  };

  return editor;
};
