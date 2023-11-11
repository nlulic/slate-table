"use client";

import {
  Column,
  ColumnInsertLeft,
  ColumnInsertRight,
  ColumnRemove,
  MergeCell,
  Row,
  RowInsertBottom,
  RowInsertTop,
  RowRemove,
  SplitCell,
  Table,
  TableMinus,
  TablePlus,
  Undo,
} from "./icons";
import { DropdownButton } from "./Dropdown";
import { FC } from "react";
import { FormatButtons } from "./FormatButtons";
import { HistoryEditor } from "slate-history";
import { TableEditor } from "slate-table";
import { useSlate } from "slate-react";

interface Props {
  canMerge: boolean;
}

export const Toolbar: FC<Props> = ({ canMerge }) => {
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
                <Table />
                <span className="sr-only">Table</span>
              </>
            }
          >
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <a
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={(event) => {
                    TableEditor.insertTable(editor, { rows: 3, cols: 3 });
                    event.preventDefault();
                  }}
                >
                  <span>Insert table</span>
                  <TablePlus width={20} height={20} />
                </a>
              </li>
              <li>
                <a
                  type="button"
                  className={`${
                    !canMerge ? "pointer-events-none text-gray-400" : ""
                  } flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100`}
                  onMouseDown={(event) => {
                    TableEditor.merge(editor);
                    event.preventDefault();
                  }}
                >
                  <span>Merge</span>
                  <MergeCell width={20} height={20} />
                </a>
              </li>
              <li>
                <a
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={(event) => {
                    TableEditor.split(editor);
                    event.preventDefault();
                  }}
                >
                  <span>Split</span>
                  <SplitCell width={20} height={20} />
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                type="button"
                className="flex justify-between px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                onMouseDown={(event) => {
                  TableEditor.removeTable(editor);
                  event.preventDefault();
                }}
              >
                <span>Delete table</span>
                <TableMinus width={20} height={20} />
              </a>
            </div>
          </DropdownButton>
        </li>
        <li>
          <DropdownButton
            className="border-gray-400 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            buttonContent={
              <>
                <Row />
                <span className="sr-only">Row</span>
              </>
            }
          >
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <a
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={(event) => {
                    TableEditor.insertRow(editor, { above: true });
                    event.preventDefault();
                  }}
                >
                  <span>Insert top</span>
                  <RowInsertTop width={20} height={20} />
                </a>
              </li>
              <li>
                <a
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={(event) => {
                    TableEditor.insertRow(editor);
                    event.preventDefault();
                  }}
                >
                  <span>Insert bottom</span>
                  <RowInsertBottom width={20} height={20} />
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                type="button"
                className="flex justify-between px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                onMouseDown={(event) => {
                  TableEditor.removeRow(editor);
                  event.preventDefault();
                }}
              >
                <span>Delete row</span>
                <RowRemove width={20} height={20} />
              </a>
            </div>
          </DropdownButton>
        </li>
        <li>
          <DropdownButton
            className="border-gray-400 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            buttonContent={
              <>
                <Column />
                <span className="sr-only">Column</span>
              </>
            }
          >
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <a
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={(event) => {
                    TableEditor.insertColumn(editor, { left: true });
                    event.preventDefault();
                  }}
                >
                  <span>Insert to left</span>
                  <ColumnInsertLeft width={20} height={20} />
                </a>
              </li>
              <li>
                <a
                  type="button"
                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={(event) => {
                    TableEditor.insertColumn(editor);
                    event.preventDefault();
                  }}
                >
                  <span>Insert to right</span>
                  <ColumnInsertRight width={20} height={20} />
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                type="button"
                className="flex justify-between px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                onMouseDown={(event) => {
                  TableEditor.removeColumn(editor);
                  event.preventDefault();
                }}
              >
                <span>Delete column</span>
                <ColumnRemove width={20} height={20} />
              </a>
            </div>
          </DropdownButton>
        </li>
      </ul>

      <div className="ml-auto" role="group">
        <button
          title="Undo"
          onMouseDown={(event) => {
            event.preventDefault();
            HistoryEditor.undo(editor);
          }}
          className="border-gray-400 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        >
          <Undo />
        </button>
      </div>
    </div>
  );
};
