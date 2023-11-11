"use client";

import * as Icon from "./icons";
import { DropdownButton } from "./Dropdown";
import { FC } from "react";
import { FormatButtons } from "./FormatButtons";
import { HistoryEditor } from "slate-history";
import { useSlate } from "slate-react";

export const Toolbar: FC = () => {
  const editor = useSlate();

  return (
    <div className="flex border-b">
      <FormatButtons />

      <ul className="pl-1 flex" role="group">
        <li>
          <DropdownButton
            className="border-gray-400 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            buttonContent={
              <>
                <Icon.Table />
                <span className="sr-only">Table</span>
              </>
            }
          >
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <a
                  onClick={() => console.warn("insert")}
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <span>Insert table</span>
                  <Icon.TablePlus width={20} height={20} />
                </a>
              </li>
              <li>
                <a
                  onClick={() => console.warn("merge")}
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <span>Merge</span>
                  <Icon.MergeCell width={20} height={20} />
                </a>
              </li>
              <li>
                <a
                  onClick={() => console.warn("split")}
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <span>Split</span>
                  <Icon.SplitCell width={20} height={20} />
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                onClick={() => console.warn("delete")}
                type="button"
                className="flex justify-between px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                <span>Delete table</span>
                <Icon.TableMinus width={20} height={20} />
              </a>
            </div>
          </DropdownButton>
        </li>
        <li>
          <DropdownButton
            className="border-gray-400 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            buttonContent={
              <>
                <Icon.Row />
                <span className="sr-only">Row</span>
              </>
            }
          >
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <a
                  onClick={() => console.warn("insert")}
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <span>Insert top</span>
                  <Icon.RowInsertTop width={20} height={20} />
                </a>
              </li>
              <li>
                <a
                  onClick={() => console.warn("insert")}
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <span>Insert bottom</span>
                  <Icon.RowInsertBottom width={20} height={20} />
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                onClick={() => console.warn("delete")}
                type="button"
                className="flex justify-between px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                <span>Delete row</span>
                <Icon.RowRemove width={20} height={20} />
              </a>
            </div>
          </DropdownButton>
        </li>
        <li>
          <DropdownButton
            className="border-gray-400 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            buttonContent={
              <>
                <Icon.Column />
                <span className="sr-only">Row</span>
              </>
            }
          >
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <a
                  onClick={() => console.warn("insert")}
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <span>Insert to left</span>
                  <Icon.ColumnInsertLeft width={20} height={20} />
                </a>
              </li>
              <li>
                <a
                  onClick={() => console.warn("insert")}
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <span>Insert to right</span>
                  <Icon.ColumnInsertRight width={20} height={20} />
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                onClick={() => console.warn("delete")}
                type="button"
                className="flex justify-between px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                <span>Delete column</span>
                <Icon.ColumnRemove width={20} height={20} />
              </a>
            </div>
          </DropdownButton>
        </li>
      </ul>

      <div className="ml-auto" role="group">
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            HistoryEditor.undo(editor);
          }}
          className="border-gray-400 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        >
          <Icon.Undo />
          <span className="sr-only">Undo</span>
        </button>
      </div>
    </div>
  );
};
