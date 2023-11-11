import { Descendant } from "slate";

export const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "Dive into ",
      },
      {
        text: "slate-table ",
        bold: true,
      },
      {
        text: "now to effortlessly modify tables. Easily add, merge, split cells, and insert rows or columns for more flexibility. 😸",
      },
    ],
  },
  {
    type: "table",
    children: [
      {
        type: "table-head",
        children: [
          {
            type: "table-row",
            children: [
              {
                type: "header-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "1",
                      },
                    ],
                  },
                ],
              },
              {
                type: "header-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "2",
                      },
                    ],
                  },
                ],
              },
              {
                type: "header-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "3",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "table-body",
        children: [
          {
            type: "table-row",
            children: [
              {
                type: "table-cell",
                rowSpan: 2,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "1",
                      },
                    ],
                  },
                ],
              },
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "2",
                      },
                    ],
                  },
                ],
              },
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "3",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "table-row",
            children: [
              {
                type: "table-cell",
                colSpan: 2,
                children: [
                  {
                    type: "paragraph",
                    children: [{ text: "5" }],
                  },
                ],
              },
            ],
          },
          {
            type: "table-row",
            children: [
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [{ text: "6" }],
                  },
                ],
              },
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [{ text: "7" }],
                  },
                ],
              },
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [{ text: "8" }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "table-footer",
        children: [
          {
            type: "table-row",
            children: [
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "1",
                      },
                    ],
                  },
                ],
              },
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "2",
                      },
                    ],
                  },
                ],
              },
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "3",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Encountered a bug 🐞? Create a GitHub issue and help enhance your experience!",
      },
    ],
  },
];
