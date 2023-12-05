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
        text: "now to effortlessly modify tables. Easily merge, split cells, and insert rows or columns for more flexibility. 😸",
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
                        text: "Time",
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
                        text: "🎨 Frontend team",
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
                        text: "👷 Backend team ",
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
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "9:00 AM",
                        bold: true,
                      },
                    ],
                  },
                ],
              },
              {
                type: "table-cell",
                colSpan: 2,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "Opening Keynote 🎉",
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
                rowSpan: 2,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "10:30 AM",
                        bold: true,
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
                    children: [{ text: "Introduction to 🅰️ngular" }],
                  },
                ],
              },
              {
                type: "table-cell",
                rowSpan: 2,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      { text: "Introduction to Gradle and Java 11 ☕" },
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
                children: [
                  {
                    type: "paragraph",
                    children: [{ text: "Strictly typed forms in v14" }],
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
                    children: [
                      {
                        text: "1:00 PM",
                        bold: true,
                      },
                    ],
                  },
                ],
              },
              {
                type: "table-cell",
                colSpan: 2,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "Lunch Break",
                        underline: true,
                      },
                      {
                        text: " 🍱",
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
        text: "Encountered a bug 🐞? Help improve slate-table by opening a GitHub issue!",
      },
    ],
  },
];
