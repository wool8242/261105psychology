import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoginNotice from '../components/LoginNotice'
import StatusMessage from '../components/StatusMessage'
import { useAsync } from '../hooks/useAsync'
import { usePageTitle } from '../hooks/usePageTitle'
import { useAuth } from '../lib/useAuth'
import { addComment, deleteComment, deletePost, getComments, getPostById } from '../services/boardService'

const input = 'w-full rounded-lg border-2 border-brand-200 bg-white px-3 py-2'

export default function BoardDetail() {
  const { id = '' } = useParams()
  const nav = useNavigate()
  const { user, ready, isAdmin, login, error: loginError } = useAuth()
  const [version, setVersion] = useState(0) // 댓글 등록·삭제 후 다시 불러오기용
  const post = useAsync(() => getPostById(id), [id])
  const comments = useAsync(() => getComments(id), [id, version])
  const [body, setBody] = useState('')
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  usePageTitle(post.data?.title ?? '게시판')

  const canDelete = (uid: string) => !!user && (user.uid === uid || isAdmin)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setMsg('')
    try {
      await addComment(id, { body: body.trim(), authorName: (name || user.displayName || '').trim().slice(0, 20), authorUid: user.uid })
      setBody('')
      setVersion((v) => v + 1)
    } catch {
      setMsg('댓글을 올리지 못했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }
  const run = async (job: () => Promise<void>, after: () => void) => {
    try { await job(); after() } catch { setMsg('삭제하지 못했습니다.') }
  }

  return (
    <div className="space-y-6">
      <Link to="/board" className="font-semibold text-brand-700 underline underline-offset-4">← 목록으로</Link>
      <StatusMessage loading={post.loading} error={post.error} empty={!post.data} emptyText="요청하신 글을 찾을 수 없습니다.">
        {post.data && (
          <article className="space-y-4 rounded-3xl border border-brand-100 bg-white p-5 shadow-soft sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-900">{post.data.title}</h1>
            <p className="text-sm text-gray-600">{post.data.authorName} · {post.data.createdAt.slice(0, 10)}</p>
            {/* React가 문자를 안전하게 처리하므로 사용자가 쓴 내용이 코드로 실행되지 않습니다 */}
            <div className="whitespace-pre-line text-lg leading-8">{post.data.body}</div>
            {canDelete(post.data.authorUid) && (
              <button type="button" className="btn-outline !py-1 !border-red-700 !text-red-800"
                onClick={() => window.confirm('이 글을 삭제할까요?') && run(() => deletePost(id), () => nav('/board'))}>글 삭제</button>
            )}
          </article>
        )}
      </StatusMessage>

      {post.data && (
        <section aria-labelledby="cm" className="space-y-4">
          <h2 id="cm" className="text-xl font-bold">댓글</h2>
          <StatusMessage loading={comments.loading} error={comments.error} empty={!comments.data?.length} emptyText="아직 댓글이 없습니다.">
            <ul className="space-y-3">
              {(comments.data ?? []).map((c) => (
                <li key={c.id} className="rounded-xl border border-brand-100 bg-white p-4">
                  <p className="text-sm text-gray-600">{c.authorName} · {c.createdAt.slice(0, 10)}</p>
                  <p className="whitespace-pre-line">{c.body}</p>
                  {canDelete(c.authorUid) && (
                    <button type="button" className="mt-2 text-sm text-red-800 underline"
                      onClick={() => window.confirm('댓글을 삭제할까요?') && run(() => deleteComment(id, c.id), () => setVersion((v) => v + 1))}>삭제</button>
                  )}
                </li>
              ))}
            </ul>
          </StatusMessage>

          {ready && !user && <LoginNotice onLogin={login} error={loginError} />}
          {user && (
            <form onSubmit={submit} className="space-y-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
              <div><label htmlFor="cname" className="block font-semibold mb-1">별명 (20자 이내)</label>
                <input id="cname" required maxLength={20} className={input} value={name || user.displayName?.slice(0, 20) || ''} onChange={(e) => setName(e.target.value)} /></div>
              <div><label htmlFor="cbody" className="block font-semibold mb-1">댓글 (1000자 이내)</label>
                <textarea id="cbody" required maxLength={1000} rows={4} className={input} value={body} onChange={(e) => setBody(e.target.value)} /></div>
              {msg && <p role="alert" className="text-red-800">{msg}</p>}
              <button type="submit" className="btn-primary">댓글 올리기</button>
            </form>
          )}
        </section>
      )}
    </div>
  )
}
