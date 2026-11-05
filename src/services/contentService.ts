// ★ Firebase 연동 시 이 파일을 교체합니다. ★
// 모든 페이지는 이 파일의 함수로만 데이터를 가져오므로, 이 파일 안쪽만
// Firestore 호출(컬렉션 `contents`)로 바꾸면 다른 코드는 수정할 필요가 없습니다.
import { sampleContents } from '../data/sampleContents'
import type { Content, ContentFilter } from '../types/content'

// 실제 서버 통신처럼 보이도록 약간의 지연을 둡니다(로딩 화면 확인용).
const wait = (ms = 300) => new Promise<void>((r) => setTimeout(r, ms))

/** 공개된 콘텐츠를 최신순으로 반환합니다. */
export async function getContents(filter: ContentFilter = {}): Promise<Content[]> {
  await wait()
  const keyword = filter.keyword?.trim().toLowerCase()
  let list = sampleContents.filter((c) => c.published)
  if (filter.type) list = list.filter((c) => c.type === filter.type)
  if (filter.category) list = list.filter((c) => c.category === filter.category)
  if (keyword) {
    list = list.filter((c) =>
      [c.title, c.summary, c.body, ...c.tags].some((t) => t.toLowerCase().includes(keyword)),
    )
  }
  list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return filter.limit ? list.slice(0, filter.limit) : list
}

/** id로 콘텐츠 한 건을 반환합니다. 없거나 비공개면 null. */
export async function getContentById(id: string): Promise<Content | null> {
  await wait()
  return sampleContents.find((c) => c.id === id && c.published) ?? null
}
