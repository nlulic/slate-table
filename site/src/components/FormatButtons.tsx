"use client";

import { Bold, Italic, Underline } from "./icons";
import { FC } from "react";
import { isMarkActive, toggleMark } from "../utils";
import { useSlate } from "slate-react";

export const FormatButtons: FC = () => {
  const editor = useSlate();

  return (
    <ul className="flex border-r pr-1" role="group">
      <li>
        <button
          title="Bold"
          className={`${
            isMarkActive(editor, "bold")
              ? "text-gray-900 bg-gray-200 hover:bg-gray-300"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          } border-gray-400 p-2`}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, "bold");
          }}
        >
          <Bold />
        </button>
      </li>
      <li>
        <button
          title="Italic"
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, "italic");
          }}
          className={`${
            isMarkActive(editor, "italic")
              ? "text-gray-900 bg-gray-200 hover:bg-gray-300"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          } border-gray-400 p-2`}
        >
          <Italic />
        </button>
      </li>
      <li>
        <button
          title="Underline"
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, "underline");
          }}
          className={`${
            isMarkActive(editor, "underline")
              ? "text-gray-900 bg-gray-200 hover:bg-gray-300"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          } border-gray-400 p-2`}
        >
          <Underline />
        </button>
      </li>
    </ul>
  );
};
