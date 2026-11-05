import { Link } from 'react-router-dom'
import type { Content } from '../types/content'

export default function ContentCard({ content }: { content: Content }) {
  // 부모교육은 상세 페이지로, 연구·수업 자료는 외부 링크(없으면 상세 없음)로 연결
  const isParenting = content.type === 'parenting'
  return (
    <article className="bg-white rounded-xl border border-brand-100 p-5 flex flex-col gap-2 shadow-sm">
      <span className="self-start text-sm bg-brand-100 text-brand-800 rounded-full px-3 py-1">{content.category}</span>
      <h3 className="text-lg font-bold">
        {isParenting ? (
          <Link to={`/parenting/${content.id}`} className="hover:underline">{content.title}</Link>
        ) : (
          content.title
        )}
      </h3>
      <p>{content.summary}</p>
      <p className="text-sm text-gray-600">{content.createdAt}</p>
      {!isParenting && content.linkUrl && (
        <a href={content.linkUrl} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline font-medium">
          자료 열기 (새 창)
        </a>
      )}
    </article>
  )
}
