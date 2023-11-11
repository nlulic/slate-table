"use client";

import { useState } from "react";
import { Editor } from "../components/Editor";
import {
  BrandGithub,
  Clipboard,
  ClipboardCheck,
  TableFilled,
} from "../components/icons";
import { initialValue } from "@/constants";

export default function Home() {
  const [value, setValue] = useState(initialValue);
  const [copied, setCopied] = useState(false);

  const toClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setTimeout(() => setCopied(false), 3000);
    setCopied(true);
  };

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://github.com/nlulic/slate-table#slate-table"
            target="_blank"
            className="flex space-x-2"
          >
            <TableFilled width={32} height={32} />
            <span className="text-2xl font-semibold whitespace-nowrap">
              slate-table
            </span>
          </a>
          <a
            href="https://github.com/nlulic/slate-table"
            className="text-white bg-black hover:bg-black/90 font-semibold rounded-lg px-5 py-2.5 text-center inline-flex items-center gap-2"
          >
            <span className="sm:hidden block">
              <BrandGithub width={16} height={16} />
            </span>
            <span className="sm:block hidden">
              <BrandGithub />
            </span>
            <span className="sm:block hidden">GitHub</span>
          </a>
        </div>
      </nav>

      <main className="flex-1 mt-24 mx-auto p-4">
        <div className="max-w-screen-xl ">
          <div className="prose max-w-none mb-4">
            <h1 className="sm:my-4">Support tables in your domain editor.</h1>

            <article className="sm:text-cl text-gray-500">
              <p>
                Supporting basic tables is easy, but implementing operations
                with rowspan and colspan attributes in mind can be tricky.{" "}
                <span className="text-gray-600 font-semibold whitespace-nowrap">
                  slate-table
                </span>{" "}
                offers a set of utilities designed to make handling tables in
                your editor flexible and simple.
              </p>
              <p>Go ahead and poke around. 🕵️‍♂️</p>
            </article>
          </div>
          <Editor onChange={setValue} />
          <aside className="prose max-w-none sm:flex hidden">
            <details>
              <summary className="select-none uppercase font-semibold text-sm cursor-pointer">
                Editor value
              </summary>
              <div className="relative">
                <pre className="mt-1 h-96 min-h-[24rem] resize-y">
                  {JSON.stringify(value, undefined, 2)}
                </pre>
                <button
                  disabled={copied}
                  onClick={() =>
                    toClipboard(JSON.stringify(value, undefined, 2))
                  }
                  title="Copy to clipboard"
                  className="not-prose absolute top-0 right-0 mb-6 mr-6 mt-2 text-black bg-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-100 font-semibold rounded-lg p-2.5 text-center inline-flex items-center gap-2"
                >
                  {copied ? <ClipboardCheck /> : <Clipboard />}
                  <span className="sr-only">Copy to clipboard</span>
                </button>
              </div>
            </details>
          </aside>
        </div>
      </main>

      <footer className="bg-white m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <span className="block text-sm text-gray-500 text-center">
            The source code is available on{" "}
            <a
              href="https://github.com/nlulic/slate-table"
              className="underline hover:text-gray-800"
            >
              GitHub
            </a>
            .
          </span>
        </div>
      </footer>
    </>
  );
}
