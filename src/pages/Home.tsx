import { Link } from 'react-router-dom'
import ContentGrid from '../components/ContentGrid'
import StatusMessage from '../components/StatusMessage'
import { useAsync } from '../hooks/useAsync'
import { usePageTitle } from '../hooks/usePageTitle'
import { getContents } from '../services/contentService'
import { PARENTING_CATEGORIES } from '../types/content'

export default function Home() {
  usePageTitle()
  const { data, loading, error } = useAsync(() => getContents({ type: 'parenting', limit: 3 }), [])

  return (
    <div className="space-y-12">
      <section className="bg-brand-50 rounded-2xl p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-800 mb-3">함께 자라는 부모, 함께 크는 아이</h1>
        <p className="mb-4">
          교육학 연구와 수업을 바탕으로, 일상에서 바로 써 볼 수 있는 부모교육 이야기를 모았습니다.
          로그인 없이 편하게 읽어 보세요.
        </p>
        <Link to="/parenting" className="inline-block bg-brand-700 text-white font-medium rounded-lg px-5 py-3 hover:bg-brand-800">
          부모교육 글 보러 가기
        </Link>
      </section>

      <section aria-labelledby="latest">
        <h2 id="latest" className="text-xl font-bold mb-4">최신 부모교육 콘텐츠</h2>
        <StatusMessage loading={loading} error={error} empty={!data?.length} emptyText="아직 등록된 글이 없습니다.">
          <ContentGrid items={data ?? []} />
        </StatusMessage>
      </section>

      <section aria-labelledby="cats">
        <h2 id="cats" className="text-xl font-bold mb-4">시기별로 찾아보기</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PARENTING_CATEGORIES.map((c) => (
            <li key={c}>
              <Link
                to={`/parenting?category=${encodeURIComponent(c)}`}
                className="block text-center bg-white border border-brand-600 text-brand-800 rounded-lg px-3 py-4 font-medium hover:bg-brand-50"
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
