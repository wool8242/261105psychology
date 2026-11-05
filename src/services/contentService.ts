// Firestore(컬렉션 `contents`)에서 콘텐츠를 읽고 쓰는 파일입니다.
// 모든 페이지는 이 파일의 함수로만 데이터에 접근합니다.
// 복합 색인(인덱스) 설정이 필요 없도록, 조건 하나만 서버에서 걸고 나머지는 화면 쪽에서 거릅니다.
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Content, ContentFilter } from '../types/content'

const col = collection(db, 'contents')

// Firestore 문서 → Content (id는 문서 id를 사용)
const toContent = (id: string, data: Record<string, unknown>): Content => ({ ...(data as Omit<Content, 'id'>), id })

/** 공개된 콘텐츠를 최신순으로 반환합니다. (누구나 호출 가능) */
export async function getContents(filter: ContentFilter = {}): Promise<Content[]> {
  // 보안 규칙이 공개 글만 읽도록 허용하므로, 질의에도 published 조건을 반드시 넣어야 합니다.
  const snap = await getDocs(query(col, where('published', '==', true)))
  let list = snap.docs.map((d) => toContent(d.id, d.data()))
  const keyword = filter.keyword?.trim().toLowerCase()
  if (filter.type) list = list.filter((c) => c.type === filter.type)
  if (filter.category) list = list.filter((c) => c.category === filter.category)
  if (keyword) {
    list = list.filter((c) =>
      [c.title, c.summary, c.body, ...(c.tags ?? [])].some((t) => t.toLowerCase().includes(keyword)),
    )
  }
  list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return filter.limit ? list.slice(0, filter.limit) : list
}

/** id로 공개된 콘텐츠 한 건을 반환합니다. 없거나 비공개면 null. */
export async function getContentById(id: string): Promise<Content | null> {
  const snap = await getDoc(doc(db, 'contents', id))
  if (!snap.exists()) return null
  const c = toContent(snap.id, snap.data())
  return c.published ? c : null
}

// ---- 아래는 관리자 전용 (보안 규칙이 관리자 이메일만 허용) ----

/** 비공개 글까지 모두 반환합니다. */
export async function getAllContentsForAdmin(): Promise<Content[]> {
  const snap = await getDocs(col)
  return snap.docs.map((d) => toContent(d.id, d.data())).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

// undefined 값은 Firestore가 거부하므로 제거합니다.
const clean = ({ id: _id, ...rest }: Content) => JSON.parse(JSON.stringify(rest)) as Omit<Content, 'id'>

/** 새 글 저장 (id 자동 생성) 또는 기존 글 수정 */
export async function saveContent(content: Content): Promise<void> {
  if (content.id) await setDoc(doc(db, 'contents', content.id), clean(content))
  else await addDoc(col, clean(content))
}

export async function deleteContent(id: string): Promise<void> {
  await deleteDoc(doc(db, 'contents', id))
}
