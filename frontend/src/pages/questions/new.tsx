import Head from "next/head";
import BaseLayout from "../../components/layouts/BaseLayout";
import React, { useState } from "react";
import type { ReactElement } from "react";
import ReactMarkdown from "react-markdown";

export default function QuestionNew() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <React.Fragment>
      <Head>
        <title>
          PHPフォルダから複数のファイルを取得し、ファイルを一つずつ読み込む方法
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4 bg-gray-100 min-h-screen">
        <div className="p-4 flex flex-row justify-between">
          <input
            className="p-2 focus:outline-none w-4/5 text-xl placeholder-gray-300 rounded-md shadow"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="w-1/5 flex justify-end">
            <button className="py-2 px-4 mr-4 font-semibold rounded-lg shadow-md text-white bg-green-400 hover:bg-green-700">
              下書き保存
            </button>
            <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-400 hover:bg-green-700">
              公開
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between md:mx-auto p-4">
          <textarea
            className="w-1/2 mr-8 border rounded-md p-2 outline-none min-h-screen text-xl placeholder-gray-300 shadow"
            placeholder="本文"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="w-1/2 border rounded-md p-1 bg-white shadow">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

QuestionNew.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
