import { CustomTypes, ExtendedType } from "slate";

export type ElementType = ExtendedType<"Element", CustomTypes>["type"];

export interface Options {
  blocks: {
    table: ElementType;
    row: ElementType;
    cell: ElementType;
  };
}

export const DEFAULT_OPTIONS = {
  blocks: {
    table: "table",
    row: "table-row",
    cell: "table-cell",
  },
} as const satisfies Options;
