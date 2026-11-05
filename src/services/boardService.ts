// 게시판(글 `posts`, 댓글 `posts/{id}/comments`)의 Firestore 읽기·쓰기 파일입니다.
// 시간은 서버 시각(serverTimestamp)으로 저장해 사용자가 날짜를 조작하지 못하게 합니다.
// 정렬은 필드 하나(createdAt)만 써서 별도 색인 설정이 필요 없습니다.
import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, Timestamp,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Comment, Post } from '../types/board'

const posts = collection(db, 'posts')
const commentsOf = (postId: string) => collection(db, 'posts', postId, 'comments')

const iso = (v: unknown) => (v instanceof Timestamp ? v.toDate().toISOString() : new Date().toISOString())
const toPost = (id: string, d: DocumentData): Post => ({ id, title: d.title, body: d.body, authorUid: d.authorUid, authorName: d.authorName, createdAt: iso(d.createdAt) })
const toComment = (id: string, d: DocumentData): Comment => ({ id, body: d.body, authorUid: d.authorUid, authorName: d.authorName, createdAt: iso(d.createdAt) })

export async function getPosts(): Promise<Post[]> {
  const snap = await getDocs(query(posts, orderBy('createdAt', 'desc'), limit(50)))
  return snap.docs.map((d) => toPost(d.id, d.data()))
}

export async function getPostById(id: string): Promise<Post | null> {
  const snap = await getDoc(doc(db, 'posts', id))
  return snap.exists() ? toPost(snap.id, snap.data()) : null
}

interface Draft { title: string; body: string; authorName: string; authorUid: string }

export async function createPost(d: Draft): Promise<string> {
  const ref = await addDoc(posts, { ...d, createdAt: serverTimestamp() })
  return ref.id
}

export const deletePost = (id: string) => deleteDoc(doc(db, 'posts', id))

export async function getComments(postId: string): Promise<Comment[]> {
  const snap = await getDocs(query(commentsOf(postId), orderBy('createdAt', 'asc'), limit(200)))
  return snap.docs.map((d) => toComment(d.id, d.data()))
}

export async function addComment(postId: string, d: Omit<Draft, 'title'>): Promise<void> {
  await addDoc(commentsOf(postId), { ...d, createdAt: serverTimestamp() })
}

export const deleteComment = (postId: string, id: string) => deleteDoc(doc(db, 'posts', postId, 'comments', id))
