import { Element } from "slate";

/** Extends an element with the "type" property  */
export type WithType<T extends Element> = T & Record<"type", unknown>;

export type CellElement = WithType<
  { rowSpan?: number; colSpan?: number } & Element
>;

export type Edge = "left" | "right" | "top" | "bottom";

export interface PreventableEvent {
  preventDefault(): void;
}
