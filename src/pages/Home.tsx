import { Link } from 'react-router-dom'
import ContentGrid from '../components/ContentGrid'
import StatusMessage from '../components/StatusMessage'
import { getCategoryStyle } from '../components/categoryStyle'
import { useAsync } from '../hooks/useAsync'
import { usePageTitle } from '../hooks/usePageTitle'
import { getContents } from '../services/contentService'
import { PARENTING_CATEGORIES } from '../types/content'

const guides = [
  { n: '1', t: '시기를 고르세요', d: '우리 아이 나이에 맞는 분류에서 글을 찾아보세요.' },
  { n: '2', t: '짧게 읽고 해 보세요', d: '요약과 본문으로 바로 써 볼 수 있는 방법을 만나요.' },
  { n: '3', t: '영상·자료로 더 깊게', d: '영상과 자료 링크로 이어서 살펴볼 수 있어요.' },
]

export default function Home() {
  usePageTitle()
  const { data, loading, error } = useAsync(() => getContents({ type: 'parenting', limit: 3 }), [])

  return (
    <div className="space-y-16">
      {/* 첫 화면: 따뜻한 그라데이션 + 장식 도형 */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 px-6 py-12 sm:px-12 sm:py-16 text-white shadow-lift">
        <div aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-peach-400/30" />
        <div aria-hidden="true" className="absolute right-24 -bottom-20 h-52 w-52 rounded-full bg-white/10" />
        <div aria-hidden="true" className="absolute left-1/2 top-6 h-16 w-16 rounded-full bg-peach-100/20" />
        <p className="relative inline-block rounded-full bg-white/15 px-4 py-1 text-sm mb-4">학부모를 위한 교육학 이야기</p>
        <h1 className="relative text-3xl sm:text-5xl font-bold leading-tight mb-4">
          함께 자라는 부모,<br />함께 크는 아이
        </h1>
        <p className="relative max-w-xl text-brand-100 text-lg mb-8">
          교육학 연구와 수업을 바탕으로, 일상에서 바로 써 볼 수 있는 부모교육 이야기를 모았습니다.
          로그인 없이 편하게 읽어 보세요.
        </p>
        <div className="relative flex flex-wrap gap-3">
          <Link to="/parenting" className="inline-flex items-center rounded-full bg-peach-400 px-6 py-3 font-semibold text-brand-900 shadow-soft transition hover:bg-peach-100">
            부모교육 글 보러 가기
          </Link>
          <Link to="/about" className="inline-flex items-center rounded-full border-2 border-white/60 px-6 py-3 font-semibold transition hover:bg-white/10">
            교수 소개
          </Link>
        </div>
      </section>

      <section aria-labelledby="cats">
        <h2 id="cats" className="text-2xl font-bold text-brand-900 mb-1">시기별로 찾아보기</h2>
        <p className="text-gray-700 mb-5">우리 아이에게 맞는 분류를 골라 보세요.</p>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARENTING_CATEGORIES.map((c) => {
            const s = getCategoryStyle(c)
            return (
              <li key={c}>
                <Link
                  to={`/parenting?category=${encodeURIComponent(c)}`}
                  className="flex h-full items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${s.chip}`}>{s.icon}</span>
                  <span>
                    <span className="block font-bold">{c}</span>
                    <span className="block text-sm text-gray-600">{s.desc}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="latest">
        <div className="flex items-end justify-between mb-5">
          <h2 id="latest" className="text-2xl font-bold text-brand-900">최신 부모교육 콘텐츠</h2>
          <Link to="/parenting" className="font-semibold text-brand-700 underline underline-offset-4">전체 보기</Link>
        </div>
        <StatusMessage loading={loading} error={error} empty={!data?.length} emptyText="아직 등록된 글이 없습니다.">
          <ContentGrid items={data ?? []} />
        </StatusMessage>
      </section>

      <section aria-labelledby="how" className="rounded-3xl bg-peach-50 border border-peach-100 px-6 py-10 sm:px-10">
        <h2 id="how" className="text-2xl font-bold text-brand-900 mb-6">이렇게 이용해 보세요</h2>
        <ol className="grid gap-5 sm:grid-cols-3">
          {guides.map((g) => (
            <li key={g.n} className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 font-bold text-white" aria-hidden="true">{g.n}</span>
              <div>
                <p className="font-bold">{g.t}</p>
                <p className="text-gray-700">{g.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
