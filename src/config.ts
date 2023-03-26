import { CustomTypes, ExtendedType } from "slate";

export type ElementType = ExtendedType<"Element", CustomTypes>["type"];

export interface Config {
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
} as const satisfies Config;
