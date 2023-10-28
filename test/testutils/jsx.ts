import { createHyperscript } from "slate-hyperscript";

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
