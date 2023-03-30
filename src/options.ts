import { CustomTypes, ExtendedType, Location } from "slate";

export type ElementType = ExtendedType<"Element", CustomTypes>["type"];

export interface WithTableOptions {
  blocks: {
    cell: ElementType;
    content: ElementType;
    row: ElementType;
    table: ElementType;
  };
}

export const DEFAULT_WITH_TABLE_OPTIONS = {
  blocks: {
    cell: "table-cell",
    content: "paragraph",
    row: "table-row",
    table: "table",
  },
} as const satisfies WithTableOptions;

export interface InsertTableOptions {
  rows: number;
  cols: number;
  at: Location | undefined;
}

export const DEFAULT_INSERT_TABLE_OPTIONS = {
  rows: 2,
  cols: 2,
  at: undefined,
} as const satisfies InsertTableOptions;
