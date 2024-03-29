import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import BaseLayout from '../../components/layouts/BaseLayout'
import { AnswerCard } from '../../components/object/AnswerCard'
import { useQuestionQuery } from '../../types/generated/type'
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Link from 'next/link'

export default function QuestionDetailPage() {
  const { query } = useRouter()
  const { data, loading } = useQuestionQuery({
    variables: {
      id: query.id as string,
    },
  })

  if (loading || !data) return null

  return (
    <>
      <Head>
        <title>{data.question.title}</title>
        <meta name="description" content="how to learn programming?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="py-4 bg-gray-100">
          <div className="flex max-w-4xl mx-auto">
            <div className="md:w-2/3 sm:w-full">
              <div className="bg-white p-4 md:mr-8">
                <h1>{data.question.title}</h1>
                <ReactMarkdown
                  components={{
                    code({ children, className, ref, ...rest }) {
                      const match = /language-(\w+)/.exec(className || '')
                      return match ? (
                        <Prism {...rest} PreTag="div" language={match[1]} style={darcula}>
                          {String(children).replace(/\n$/, '')}
                        </Prism>
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      )
                    },
                  }}
                >
                  {data.question.content}
                </ReactMarkdown>

                <div className="flex justify-between">
                  <button>share</button>

                  {data.question.postedByMe && (
                    <Link
                      href={{
                        pathname: '/questions/[id]/edit',
                        query: { id: query.id },
                      }}
                    >
                      <button>編集</button>
                    </Link>
                  )}
                </div>
              </div>

              <h3 className="p-4">2件の解答</h3>

              <div className="md:mr-8">
                {[0, 1].map((item) => (
                  <AnswerCard key={item} />
                ))}
              </div>
            </div>
            <div className="hidden md:inline-block w-1/3 bg-blue-100 p-4">
              <p>ad here?</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

QuestionDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>
}
