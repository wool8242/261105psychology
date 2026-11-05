// 콘텐츠 한 건의 구조. Firestore 연동 후에도 같은 모양을 유지합니다.
export type ContentType = 'parenting' | 'research' | 'lecture'

export interface Content {
  id: string
  type: ContentType
  title: string
  summary: string
  body: string
  category: string
  tags: string[]
  videoUrl?: string // 유튜브 주소 (선택)
  linkUrl?: string // 구글 드라이브 등 외부 자료 링크 (선택)
  createdAt: string // ISO 날짜 문자열 (예: 2025-03-01)
  published: boolean
}

// 목록 조회 조건
export interface ContentFilter {
  type?: ContentType
  category?: string
  keyword?: string
  limit?: number
}

export const PARENTING_CATEGORIES = ['영유아기', '아동기', '청소년기', '부모 마음돌봄'] as const
