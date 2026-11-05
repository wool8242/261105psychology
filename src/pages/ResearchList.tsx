import { useState } from 'react'
import ContentGrid from '../components/ContentGrid'
import StatusMessage from '../components/StatusMessage'
import { useAsync } from '../hooks/useAsync'
import { usePageTitle } from '../hooks/usePageTitle'
import { getContents } from '../services/contentService'
import type { Content } from '../types/content'

const kinds = ['논문', '발표자료', '수업자료']

export default function ResearchList() {
  usePageTitle('연구·수업 자료')
  const [kind, setKind] = useState('')
  // 연구(research)와 수업(lecture) 두 유형을 합쳐서 가져온 뒤 화면에서 분류합니다.
  const { data, loading, error } = useAsync<Content[]>(async () => {
    const [r, l] = await Promise.all([getContents({ type: 'research' }), getContents({ type: 'lecture' })])
    return [...r, ...l].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }, [])

  const items = (data ?? []).filter((c) => !kind || c.category === kind)
  const tab = (active: boolean) =>
    `px-4 py-2 rounded-full border font-medium ${active ? 'bg-brand-700 text-white border-brand-700' : 'bg-white text-brand-800 border-brand-600 hover:bg-brand-50'}`

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">연구·수업 자료</h1>
      <div role="group" aria-label="자료 유형 필터" className="flex flex-wrap gap-2">
        <button type="button" className={tab(!kind)} aria-pressed={!kind} onClick={() => setKind('')}>전체</button>
        {kinds.map((k) => (
          <button key={k} type="button" className={tab(kind === k)} aria-pressed={kind === k} onClick={() => setKind(k)}>{k}</button>
        ))}
      </div>
      <StatusMessage loading={loading} error={error} empty={!items.length} emptyText="등록된 자료가 없습니다.">
        <ContentGrid items={items} />
      </StatusMessage>
    </div>
  )
}
