"use client";

import { BaseEditor, Descendant, createEditor } from "slate";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { FC, useCallback, useMemo } from "react";
import { HistoryEditor, withHistory } from "slate-history";
import { Toolbar } from "./Toolbar";
import { initialValue } from "../constants";
import { withTable } from "slate-table";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: Text;
  }
}

export const Editor: FC<{ onChange: (v: Descendant[]) => void }> = ({
  onChange,
}) => {
  const editor = useMemo(
    () =>
      withTable(withReact(withHistory(createEditor())), {
        blocks: {
          table: "table",
          thead: "table-head",
          tbody: "table-body",
          tfoot: "table-footer",
          tr: "table-row",
          th: "header-cell",
          td: "table-cell",
          content: "paragraph",
        },
      }),
    []
  );

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "table":
        return (
          <Table
            className="table-fixed my-4 sm:w-1/2 w-full text-center"
            {...props}
          />
        );
      case "table-head":
        return (
          <thead
            className="border-b text-sm uppercase bg-gray-50"
            {...props.attributes}
          >
            {props.children}
          </thead>
        );
      case "table-body":
        return (
          <tbody className="border-b text-sm" {...props.attributes}>
            {props.children}
          </tbody>
        );
      case "table-footer":
        return (
          <tfoot className="" {...props.attributes}>
            {props.children}
          </tfoot>
        );
      case "table-row":
        return <tr {...props.attributes}>{props.children}</tr>;
      case "header-cell":
        return <Th className="border border-gray-400" {...props} />;
      case "table-cell":
        return <Td className="border border-gray-400" {...props} />;
      case "paragraph":
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Text {...props} />,
    []
  );

  return (
    <section className="mb-4 border border-gray-200 rounded-lg bg-gray-50">
      <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
        <Toolbar />
        <div className="prose lg:prose-lg max-w-none bg-white p-4 rounded-b-lg">
          <Editable
            placeholder="👷 Start by creating a table and play around..."
            className="focus:outline-none"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </div>
      </Slate>
    </section>
  );
};

type CustomElement =
  | Table
  | TableHead
  | TableBody
  | TableFooter
  | Tr
  | Th
  | Td
  | Paragraph;

interface Table {
  type: "table";
  children: Array<TableHead | TableBody | TableFooter>;
}

const Table: FC<RenderElementProps & { className: string }> = ({
  attributes,
  children,
  className,
}) => (
  <table className={className} {...attributes}>
    {children}
  </table>
);

interface TableHead {
  type: "table-head";
  children: Tr[];
}

interface TableBody {
  type: "table-body";
  children: Tr[];
}

interface TableFooter {
  type: "table-footer";
  children: Tr[];
}

interface Tr {
  type: "table-row";
  children: Array<Td | Th>;
}

interface Th {
  type: "header-cell";
  rowSpan?: number;
  colSpan?: number;
  children: Array<CustomElement | Text>;
}

const Th: FC<RenderElementProps & { className: string }> = ({
  attributes,
  children,
  className,
  element,
}) => {
  if (element.type !== "header-cell") {
    throw new Error('Element "Th" must be of type "header-cell"');
  }

  return (
    <th
      className={className}
      rowSpan={element.rowSpan}
      colSpan={element.colSpan}
      {...attributes}
    >
      {children}
    </th>
  );
};

interface Td {
  type: "table-cell";
  rowSpan?: number;
  colSpan?: number;
  children: Array<CustomElement | Text>;
}

const Td: FC<RenderElementProps & { className: string }> = ({
  attributes,
  children,
  className,
  element,
}) => {
  if (element.type !== "table-cell") {
    throw new Error('Element "Td" must be of type "table-cell"');
  }

  return (
    <td
      className={className}
      rowSpan={element.rowSpan}
      colSpan={element.colSpan}
      {...attributes}
    >
      {children}
    </td>
  );
};

interface Paragraph {
  type: "paragraph";
  children: Array<CustomElement | Text>;
}

interface Text {
  text: string;
}

const Text: FC<RenderLeafProps> = ({ attributes, children }) => (
  <span {...attributes}>{children}</span>
);
