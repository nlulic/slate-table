import { Editor, Element } from "slate";
import { createHyperscript } from "slate-hyperscript";
import { WithTableOptions, DEFAULT_WITH_TABLE_OPTIONS } from "../src/options";

export const jsx = createHyperscript({
  elements: {
    table: {
      type: "table",
    },
    thead: {
      type: "table-head",
    },
    tbody: {
      type: "table-body",
    },
    tfoot: {
      type: "table-footer",
    },
    tr: {
      type: "table-row",
    },
    th: {
      type: "header-cell",
    },
    td: {
      type: "table-cell",
    },
    paragraph: {
      type: "paragraph",
    },
    inline: { inline: true },
  },
});

export const DEFAULT_TEST_WITH_TABLE_OPTIONS = {
  ...DEFAULT_WITH_TABLE_OPTIONS,
  withNormalization: false,
} as const satisfies WithTableOptions;

export const withTest = (editor: Editor) => {
  const { isInline } = editor;

  editor.isInline = (element: Element & { inline?: boolean }) => {
    return element.inline === true ? true : isInline(element);
  };

  return editor;
};
