// 게시판 글과 댓글의 구조. 이메일 등 개인정보는 저장하지 않고 별명과 로그인 고유번호(uid)만 저장합니다.
export interface Post {
  id: string
  title: string
  body: string
  authorUid: string
  authorName: string
  createdAt: string // ISO 문자열
}

export interface Comment {
  id: string
  body: string
  authorUid: string
  authorName: string
  createdAt: string
}
