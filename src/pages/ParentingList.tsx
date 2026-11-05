import { useSearchParams } from 'react-router-dom'
import ContentGrid from '../components/ContentGrid'
import SearchBar from '../components/SearchBar'
import PageHeader from '../components/PageHeader'
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

  const tab = (active: boolean) => `pill ${active ? 'pill-on' : 'pill-off'}`

  return (
    <div className="space-y-6">
      <PageHeader title="부모교육" subtitle="시기별로 골라 읽고, 키워드로 검색해 보세요." />
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
