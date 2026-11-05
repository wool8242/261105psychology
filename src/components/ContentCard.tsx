import { Link } from 'react-router-dom'
import type { Content } from '../types/content'
import { getCategoryStyle } from './categoryStyle'

export default function ContentCard({ content }: { content: Content }) {
  // 부모교육은 상세 페이지로, 연구·수업 자료는 외부 링크로 연결
  const isParenting = content.type === 'parenting'
  const s = getCategoryStyle(content.category)
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-brand-100 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      <div className={`h-1.5 ${s.bar}`} aria-hidden="true" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium rounded-full px-3 py-1 ${s.chip}`}>{content.category}</span>
          <span className="text-sm text-gray-600">{content.createdAt}</span>
        </div>
        <h3 className="text-lg font-bold leading-snug">
          {isParenting ? (
            // 카드 전체를 눌러도 이동하도록 링크를 카드 크기로 확장
            <Link to={`/parenting/${content.id}`} className="after:absolute after:inset-0 hover:text-brand-700">
              {content.title}
            </Link>
          ) : (
            content.title
          )}
        </h3>
        <p className="text-gray-700">{content.summary}</p>
        <div className="mt-auto pt-2">
          {isParenting ? (
            <span className="font-semibold text-brand-700" aria-hidden="true">자세히 보기 →</span>
          ) : (
            content.linkUrl && (
              <a href={content.linkUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline underline-offset-4">
                자료 열기 (새 창) ↗
              </a>
            )
          )}
        </div>
      </div>
    </article>
  )
}
