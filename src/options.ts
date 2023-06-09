import { CustomTypes, ExtendedType, Location } from "slate";

type ElementType = ExtendedType<"Element", CustomTypes>["type"];

export interface WithTableOptions {
  blocks: {
    td: ElementType;
    th: ElementType;
    content: ElementType;
    tr: ElementType;
    table: ElementType;
    tbody: ElementType;
    tfoot: ElementType;
    thead: ElementType;
  };
  withNormalization: boolean;
}

export const DEFAULT_WITH_TABLE_OPTIONS = {
  blocks: {
    td: "table-cell",
    th: "header-cell",
    content: "paragraph",
    tr: "table-row",
    table: "table",
    tbody: "table-body",
    tfoot: "table-footer",
    thead: "table-head",
  },
  withNormalization: true,
} as const satisfies WithTableOptions;

export interface InsertTableOptions {
  rows: number;
  cols: number;
  at?: Location;
}

export const DEFAULT_INSERT_TABLE_OPTIONS = {
  rows: 2,
  cols: 2,
} as const satisfies InsertTableOptions;
