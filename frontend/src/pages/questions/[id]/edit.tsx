import Head from 'next/head'
import BaseLayout from '../../../components/layouts/BaseLayout'
import React, { MouseEventHandler, useState } from 'react'
import type { ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  useCategoriesQuery,
  useUpdateQuestionMutation,
  useQuestionQuery,
} from '../../../types/generated/type'
import { useRouter } from 'next/router'

export default function QuestionEditPage() {
  const { query } = useRouter()
  const { data, loading: questionLoading } = useQuestionQuery({
    variables: {
      id: query.id as string,
    },
  })
  const { data: categories, loading: categoriesLoading } = useCategoriesQuery()
  const [updateQuestion, { loading: postQuestionLoading }] = useUpdateQuestionMutation()

  const [title, setTitle] = useState(data?.question.title)
  const [content, setContent] = useState(data?.question.content)
  const [categoryId, setCategoryId] = useState('1')

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    updateQuestion({
      variables: {
        questionId: query.id as string,
        title: title ?? '',
        content: content ?? '',
        categoryId,
      },
    })
      .then(() => {
        alert('質問を更新しました')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  if (categoriesLoading || questionLoading || !categories || !data) return null

  return (
    <React.Fragment>
      <Head>
        <title>質問を編集する</title>
        <meta name="description" content="write new question" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 bg-gray-100 min-h-screen">
        <div>
          <div className="py-4 flex flex-col md:flex-row justify-between">
            <input
              className="p-2 focus:outline-none w-full md:w-4/5 text-xl placeholder-gray-300 rounded-md shadow"
              placeholder="タイトル"
              defaultValue={data.question.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="pt-8 md:py-0 w-full md:w-1/5 flex md:justify-end">
              <button className="py-2 px-4 mr-4 font-semibold rounded-lg shadow-md text-white bg-green-400 hover:bg-green-700">
                下書き保存
              </button>
              <button
                onClick={handleSubmit}
                className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-400 hover:bg-green-700"
              >
                {postQuestionLoading ? '投稿中...' : '投稿'}
              </button>
            </div>
          </div>

          <div className="inline-block relative py-4">
            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              {categories.categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  onClick={() => setCategoryId(category.id.toString())}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:mx-auto">
            <textarea
              className="w-full md:w-1/2 mr-0 md:mr-8 border rounded-md p-2 outline-none min-h-screen text-xl placeholder-gray-300 shadow"
              placeholder="本文"
              defaultValue={data.question.content}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="invisible md:visible w-full md:w-1/2 border rounded-md p-1 bg-white shadow">
              <ReactMarkdown>{content ?? ''}</ReactMarkdown>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

QuestionEditPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>
}
