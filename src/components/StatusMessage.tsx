// 로딩·빈 상태·오류 상태를 한 곳에서 같은 모양으로 보여 줍니다.
interface Props {
  loading: boolean
  error: string | null
  empty: boolean
  emptyText?: string
  children: React.ReactNode
}

const box = 'rounded-2xl border-2 border-dashed border-brand-200 bg-white/60 py-12 text-center'

export default function StatusMessage({ loading, error, empty, emptyText = '표시할 내용이 없습니다.', children }: Props) {
  if (loading)
    return (
      <div role="status" className={`${box} text-gray-700`}>
        <span className="inline-block h-6 w-6 mb-2 animate-spin rounded-full border-4 border-brand-200 border-t-brand-700" aria-hidden="true" />
        <p>불러오는 중입니다…</p>
      </div>
    )
  if (error) return <p role="alert" className={`${box} text-red-800`}>{error}</p>
  if (empty) return <p className={`${box} text-gray-700`}>{emptyText}</p>
  return <>{children}</>
}
