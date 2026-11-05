import { useSearchParams } from 'react-router-dom'
import ContentGrid from '../components/ContentGrid'
import SearchBar from '../components/SearchBar'
import StatusMessage from '../components/StatusMessage'
import { useAsync } from '../hooks/useAsync'
import { usePageTitle } from '../hooks/usePageTitle'
import { getContents } from '../services/contentService'
import { PARENTING_CATEGORIES } from '../types/content'

export default function ParentingList() {
  usePageTitle('부모교육')
  // 필터를 주소(?category=..&q=..)에 저장하면 홈의 바로가기 링크와 새로고침이 자연스럽게 동작합니다.
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? ''
  const keyword = params.get('q') ?? ''

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const { data, loading, error } = useAsync(
    () => getContents({ type: 'parenting', category: category || undefined, keyword }),
    [category, keyword],
  )

  const tab = (active: boolean) =>
    `px-4 py-2 rounded-full border font-medium ${active ? 'bg-brand-700 text-white border-brand-700' : 'bg-white text-brand-800 border-brand-600 hover:bg-brand-50'}`

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">부모교육</h1>
      <SearchBar value={keyword} onChange={(v) => update('q', v)} />
      <div role="group" aria-label="시기별 필터" className="flex flex-wrap gap-2">
        <button type="button" className={tab(!category)} aria-pressed={!category} onClick={() => update('category', '')}>전체</button>
        {PARENTING_CATEGORIES.map((c) => (
          <button key={c} type="button" className={tab(category === c)} aria-pressed={category === c} onClick={() => update('category', c)}>
            {c}
          </button>
        ))}
      </div>
      <StatusMessage loading={loading} error={error} empty={!data?.length} emptyText="조건에 맞는 글이 없습니다. 다른 검색어나 분류를 선택해 보세요.">
        <ContentGrid items={data ?? []} />
      </StatusMessage>
    </div>
  )
}
