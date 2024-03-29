import { CategoryLabel } from '@/components/CategoryLabel'
import { NavigationHeader } from '@/components/NavigationHeader'
import { QuestionCard } from '@/components/QuestionCard'
import { Sidebar } from '@/components/Sidebar'
import { getCategories, getQuestions } from '@/lib/data'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const categories = await getCategories()
  const questions = await getQuestions()

  return (
    <div>
      <NavigationHeader />
      <div className="grid grid-cols-9 gap-4 p-4 bg-gray-50">
        <Sidebar />
        <div className="col-span-9 sm:col-span-7">
          <div className="px-4 md:px-8 py-4 bg-green-50 rounded-xl mb-4">
            <h2 className="my-4 pl-3 text-xl font-bold border-l-4 border-green-300">
              カテゴリから探す
            </h2>
            <div className="flex flex-row flex-wrap gap-8">
              {categories.map((e) => (
                <CategoryLabel key={e.id} name={e.name} categoryId={e.id} />
              ))}
            </div>
          </div>

          <div className="px-4 md:px-8 py-4 bg-gray-100 rounded-xl mb-4">
            <h2 className="my-4 pl-3 text-xl font-bold border-l-4 border-green-300">
              人気の質問から探す
            </h2>
            <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-4 mx-auto">
              {questions.map((item) => (
                <QuestionCard
                  key={item.id}
                  id={item.id.toString()}
                  title={item.title}
                  content={item.content}
                />
              ))}
            </div>
          </div>
          <div className="px-4 md:px-8 py-4 bg-gray-100 rounded-xl">
            <h2 className="my-4 pl-3 text-xl font-bold border-l-4 border-green-300">
              最新の質問から探す
            </h2>
            <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-4">
              {questions.map((item) => (
                <QuestionCard
                  key={item.id}
                  id={item.id.toString()}
                  title={item.title}
                  content={item.content}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
