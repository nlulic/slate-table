import { Element, NodeEntry } from "slate";

/** Extends an element with the "type" property  */
export type WithType<T extends Element> = T & Record<"type", unknown>;

export type CellElement = WithType<
  { rowSpan?: number; colSpan?: number } & Element
>;

export type Edge = "left" | "right" | "top" | "bottom";

export interface PreventableEvent {
  preventDefault(): void;
}

export type NodeEntryWithContext = [
  NodeEntry<CellElement>,
  {
    rtl: number; // right-to-left (colspan)
    ltr: number; // left-to-right (colspan)
    ttb: number; // top-to-bottom (rowspan)
    btt: number; // bottom-to-top (rowspan)
  }
];
