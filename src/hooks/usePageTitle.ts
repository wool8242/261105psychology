// 페이지마다 브라우저 탭 제목을 설정합니다.
import { useEffect } from 'react'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | 부모교육 · 연구수업 자료실` : '부모교육 · 연구수업 자료실'
  }, [title])
}
