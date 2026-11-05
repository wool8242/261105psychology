// 비동기 데이터를 불러오며 로딩·오류 상태를 함께 관리합니다.
import { useEffect, useState } from 'react'

export function useAsync<T>(loader: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false // 검색어가 빠르게 바뀔 때 이전 응답이 덮어쓰지 않도록
    setLoading(true)
    setError(null)
    loader()
      .then((d) => !cancelled && setData(d))
      .catch(() => !cancelled && setError('내용을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error }
}
