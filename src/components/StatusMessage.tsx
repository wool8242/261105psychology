// 로딩·빈 상태·오류 상태를 한 곳에서 같은 모양으로 보여 줍니다.
interface Props {
  loading: boolean
  error: string | null
  empty: boolean
  emptyText?: string
  children: React.ReactNode
}

export default function StatusMessage({ loading, error, empty, emptyText = '표시할 내용이 없습니다.', children }: Props) {
  if (loading) return <p role="status" className="py-10 text-center text-gray-700">불러오는 중입니다…</p>
  if (error) return <p role="alert" className="py-10 text-center text-red-800">{error}</p>
  if (empty) return <p className="py-10 text-center text-gray-700">{emptyText}</p>
  return <>{children}</>
}
