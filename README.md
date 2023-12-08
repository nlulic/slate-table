<section align="middle">

<h1 style="border: none;">
  <img align="center" src="site/public/table-filled.svg" alt="logo" height="32" />&nbsp;slate-table
</h1>

<p>A set of utilities for simple and flexible table editing in your <a href="https://github.com/ianstormtaylor/slate"><em>slate</em></a> editor.</p>

<p align="center">
  <a href="https://slate-table.org/"><strong>Demo</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#documentation"><strong>Documentation</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/slate-table.svg?maxAge=3600&label=version&colorB=007ec6">
  <img src="https://img.shields.io/github/license/nlulic/slate-table">
  <img src="https://img.shields.io/codecov/c/github/nlulic/slate-table">
</p>
<br/>
</section>

Rendering tables in slate is easy, but incorporating the functionality to work with more complex table structures can be tricky and time-consuming. `slate-table` offers essential utilities and incorporates sensible default behavior to help you craft the table experience your domain editor needs.

> 🚧 **This package is currently in beta**, and there may be breaking changes to both behavior and API. If you come across any difficulties or would like to share your feedback, feel free to raise an issue.

## Features 

Some fundamental features that are currently available:

| Feature                        |     Implemented    |
|--------------------------------|--------------------|
| Creating and deleting tables   | <center>✅</center>|
| Inserting and deleting rows    | <center>✅</center>|
| Inserting and deleting columns | <center>✅</center>|
| Merge and split cells          | <center>✅</center>|
| Table navigation               | <center>✅</center>|
| Nested tables                  | <center>🙅</center>|

Support for nested tables is expected in future updates.

## Documentation

`slate-table` is view-layer agnostic, so it doesn't ship with any predefined components. While this means that you'll need to create your own components, it also gives you the freedom to shape the table experience your domain editor needs.

It is also important to note that `slate-table` makes *some assumptions* about your schema:

1. **A required `type` property:** Make sure to specify a `type` property for *every* table block in your schema.
2. **Cell children restriction:** Cells ("th" & "td" block) can only contain blocks of the  type "content". Stick to this rule when organizing the content within your table.
3. **Merge and split:** "th" & "td" blocks will receive  `rowSpan` and `colSpan` properties. Make sure to expect them in your components.

> 💡 **You can refer to the [source code](https://github.com/nlulic/slate-table/blob/main/site/src/components/Editor.tsx#L34)** of the example implementation for further insights.

### Install

This module is distributed via [npm](https://www.npmjs.com/) and should be installed as one of your project's dependencies:

```
npm install slate-table
```

> 💡 **This package also depends on `slate`**. Please make sure you have it installed.

### API

#### `withTable`

The `withTable` function is the Slate plugin that enhances the editor behavior for tables, including selection, deletion, and normalization. The `options` parameter allows you to specify the `type` property for the corresponding table blocks and disable any default behavior. 

> 💡 The options passed to the `withTable` function will be used in all subsequent table operations.

###### Usage

```typescript
import { withTable } from "slate-table";

const editor = withTable(editor, {
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
  withDelete: true,
  withFragments: true,
  withInsertText: true,
  withNormalization: true,
  withSelection: true,
  withSelectionAdjustment: true,
});
```

#### `TableEditor`

The `TableEditor` simplifies table editing by providing a set of static methods for inserting and removing tables, rows, and columns, as well as merging and splitting cells.

##### `insertTable(editor: Editor, options?: Partial<InsertTableOptions>): void`

Inserts a table at the specified location with the specified number of rows. If no location is specified it will be inserted at the current selection.
  
###### Usage

```typescript
import { TableEditor } from "slate-table";

TableEditor.insertTable(editor, { rows: 3, cols: 3, at: [] });
```

- **rows?: number**: the number of rows defaults to 2.
- **cols?: number**: the number of columns, defaults to 2.
- **at?: Location**: Where the table should be created. Defaults to the current selection.

##### `removeTable(editor: Editor, options?: { at?: Location }): void` 

Removes a table at the specified location. If no location is specified it will remove the table at the current selection.

###### Usage

```typescript
import { TableEditor } from "slate-table";

TableEditor.removeTable(editor);
```

- **at?: Location**: From where the table should be removed. Defaults to the current selection.

##### `insertRow(editor: Editor, options?: { at?: Location, before?: boolean }): void` 

Inserts a new row at the specified location. If no location is specified it will insert the row at the current selection.

- **at?: Location**: Where the row should be inserted. Defaults to the current selection.
- **before?: boolean**: If true, will insert the row before the specified location.

###### Usage

```typescript
import { TableEditor } from "slate-table";

TableEditor.insertRow(editor, { before: true });
```

##### `removeRow(editor: Editor, options?: { at?: Location }): void` 

Removes the row at the specified location. If no location is specified it will remove the row at the current selection.

- **at?: Location**: From where the row should be removed. Defaults to the current selection.

###### Usage

```typescript
import { TableEditor } from "slate-table";

TableEditor.removeRow(editor);
```

##### `insertColumn(editor: Editor, options?: { at?: Location, before?: boolean }): void` 

Inserts a column at the specified location. If no location is specified it will insert the column at the current selection.

- **at?: Location**: Where the column should be inserted. Defaults to the current selection.
- **before?: boolean**: If true, will insert the column before the specified location.

###### Usage

```typescript
import { TableEditor } from "slate-table";

TableEditor.insertColumn(editor, { before: true });
```

##### `removeColumn(editor: Editor, options?: { at?: Location }): void`

Removes the column at the specified location. If no location is specified it will remove the column at the current selection.

- **at?: Location**: From where the column should be removed. Defaults to the current selection.

###### Usage

```typescript
import { TableEditor } from "slate-table";

TableEditor.removeColumn(editor);
```

##### `canMerge(editor: Editor): boolean`

Checks if the current selection can be merged. Merging is not possible when any of the following conditions are met:
- The selection is empty.
- The selection is not within the same "thead," "tbody," or "tfoot" section.

###### Usage

```typescript
import { TableEditor } from "slate-table";

TableEditor.canMerge(editor);
```

##### `merge(editor: Editor): void`

Merges the selected cells in the table.

###### Usage

```typescript
import { TableEditor } from "slate-table";

TableEditor.merge(editor);
```

##### `split(editor: Editor, options?: { at?: Location; all?: boolean }): void`

Splits either the cell at the current selection or a specified location. If a range selection is present, all cells within the range will be split.

- **at?: Location**: Where the cell should be split. Defaults to the currenct selection.
- **all?: boolean**: If true, will split all cells in the selected table.

###### Usage

```typescript
import { TableEditor } from "slate-table";

TableEditor.split(editor, { all: true });
```

#### `TableCursor`

The `TableCursor` offers a set of static methods for manipulating the cursor within the table and retrieving the table selection.

##### `isInTable(editor: Editor, options?: { at?: Location }): boolean`

Returns `true` if the selection is inside a table, otherwise `false`.

- **at?: Location**: The location which should be checked. Defaults to the currenct selection.

###### Usage

```typescript
import { TableCursor } from "slate-table";

TableCursor.isInTable(editor);
```

##### `upward(editor: Editor, options?: { mode?: SelectionMode }): boolean`

Moves the cursor to the cell above the current selection and returns `true` if the action was successful.

- **mode?: SelectionMode**: If set to "all," it will select the cell content. If set to "start," the cursor will be placed at the beginning of the cell's content. Otherwise, it will be placed at the end of the cell's content. Defaults to "end".

###### Usage

```typescript
import { TableCursor } from "slate-table";

TableCursor.upward(editor);
```

##### `downward(editor: Editor, options?: { mode?: SelectionMode }): boolean`

Moves the cursor to the cell below the current selection and returns `true` if the action was successful.

- **mode?: SelectionMode**: If set to "all," it will select the cell content. If set to "start," the cursor will be placed at the beginning of the cell's content. Otherwise, it will be placed at the end of the cell's content. Defaults to "end".

###### Usage

```typescript
import { TableCursor } from "slate-table";

TableCursor.downward(editor);
```
##### `forward(editor: Editor, options?: { mode?: SelectionMode }): boolean`

Moves the cursor to the cell next to the current selection and returns `true` if the action was successful.

- **mode?: SelectionMode**: If set to "all," it will select the cell content. If set to "start," the cursor will be placed at the beginning of the cell's content. Otherwise, it will be placed at the end of the cell's content. Defaults to "end".

###### Usage

```typescript
import { TableCursor } from "slate-table";

TableCursor.forward(editor);
```

##### `backward(editor: Editor, options?: { mode?: SelectionMode }): boolean`

Moves the cursor to the cell before to the current selection and returns `true` if the action was successful.

- **mode?: SelectionMode**: If set to "all," it will select the cell content. If set to "start," the cursor will be placed at the beginning of the cell's content. Otherwise, it will be placed at the end of the cell's content. Defaults to "end".

###### Usage

```typescript
import { TableCursor } from "slate-table";

TableCursor.backward(editor);
```

##### `isOnEdge(editor: Editor, edge: "start" | "end" | "top" | "bottom"): boolean`

Checks if the selection is positioned on an edge within a "td" or "th" block.

- **edge?: "start" | "end" | "top" | "bottom"**: Specifies which edge to check:
  - `start`: checks if the cursor is positioned at the start of the cell's content
  - `end`: checks if the cursor is positioned at the end of the cell's content
  - `top`: checks if the cursor is positioned at the first block of the cell's content
  - `bottom`: checks if the cursor is positioned at the last block of the cell's content

###### Usage

```typescript
import { TableCursor } from "slate-table";

TableCursor.isOnEdge(editor, "end");
```

##### `isInFirstCell(editor: Editor, options?: { reverse?: boolean }): boolean`

Checks if the cursor is in the first cell of the table.

- **reverse?: boolean**: If true, checks the table in reverse order to determine if the cell is last in table.

###### Usage

```typescript
import { TableCursor } from "slate-table";

TableCursor.isInFirstCell(editor);
```

##### `isInLastCell(editor: Editor): boolean`

Checks if the cursor is in the last cell of the table. This is the reverse of `TableCursor.isInFirstCell` and is provided for legibility.

###### Usage

```typescript
import { TableCursor } from "slate-table";

TableCursor.isInLastCell(editor);
```

##### `isInFirstRow(editor: Editor, options?: { reverse?: boolean }): boolean`

Checks if the cursor is in the first tr of the table.

- **reverse?: boolean**: If true, checks the table in reverse order to determine if the tr is last in table.

###### Usage

```typescript
import { TableCursor } from "slate-table";

TableCursor.isInFirstRow(editor);
```

##### `isInLastRow(editor: Editor): boolean`

Checks if the cursor is in the last row of the table. This is the reverse of `TableCursor.isInFirstRow` and is provided for legibility.

###### Usage

```typescript
import { TableCursor } from "slate-table";

TableCursor.isInLastRow(editor);
```

##### `selection(editor: Editor): Generator<NodeEntry[]>`

A generator that retrieves a matrix of `NodeEntry[][]` containing the selected cells.

###### Usage

```typescript
import { TableCursor } from "slate-table";

const selected = [...TableCursor.selection(editor)];
```

##### `unselect(editor: Editor): void`

Clears the table selection from the editor.

###### Usage

```typescript
import { TableCursor } from "slate-table";

TableCursor.unselect(editor);
```

##### `isSelected(editor: Editor, element: Element): boolean`

Checks whether a given cell is part of the current table selection.

###### Usage

```typescript
import { TableCursor } from "slate-table";

const isSelected = TableCursor.isSelected(editor, element);
```
