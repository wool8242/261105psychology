import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginNotice from '../components/LoginNotice'
import PageHeader from '../components/PageHeader'
import StatusMessage from '../components/StatusMessage'
import { useAsync } from '../hooks/useAsync'
import { usePageTitle } from '../hooks/usePageTitle'
import { useAuth } from '../lib/useAuth'
import { createPost, getPosts } from '../services/boardService'

const input = 'w-full rounded-lg border-2 border-brand-200 bg-white px-3 py-2'

export default function BoardList() {
  usePageTitle('게시판')
  const nav = useNavigate()
  const { user, ready, login, error: loginError } = useAuth()
  const { data, loading, error } = useAsync(() => getPosts(), [])
  const [writing, setWriting] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setBusy(true)
    setMsg('')
    try {
      const id = await createPost({ title: title.trim(), body: body.trim(), authorName: name.trim(), authorUid: user.uid })
      nav(`/board/${id}`)
    } catch {
      setMsg('글을 올리지 못했습니다. 잠시 후 다시 시도해 주세요.')
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="게시판" subtitle="궁금한 점이나 이야기를 나눠 보세요. 서로 존중하는 말로 써 주세요." />

      {ready && !user && <LoginNotice onLogin={login} error={loginError} />}
      {user && !writing && <button type="button" className="btn-primary" onClick={() => { setName(user.displayName?.slice(0, 20) ?? ''); setWriting(true) }}>글쓰기</button>}

      {user && writing && (
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <div><label htmlFor="name" className="block font-semibold mb-1">별명 (20자 이내)</label>
            <input id="name" required maxLength={20} className={input} value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><label htmlFor="title" className="block font-semibold mb-1">제목</label>
            <input id="title" required maxLength={100} className={input} value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div><label htmlFor="body" className="block font-semibold mb-1">내용 (3000자 이내)</label>
            <textarea id="body" required maxLength={3000} rows={7} className={input} value={body} onChange={(e) => setBody(e.target.value)} /></div>
          <p className="text-sm text-gray-600">전화번호, 주소 등 개인정보는 쓰지 마세요. 올린 글은 누구나 볼 수 있습니다.</p>
          {msg && <p role="alert" className="text-red-800">{msg}</p>}
          <div className="flex gap-2">
            <button type="submit" disabled={busy} className="btn-primary">{busy ? '올리는 중…' : '올리기'}</button>
            <button type="button" className="btn-outline" onClick={() => setWriting(false)}>취소</button>
          </div>
        </form>
      )}

      <StatusMessage loading={loading} error={error} empty={!data?.length} emptyText="아직 글이 없습니다. 첫 글을 남겨 보세요.">
        <ul className="space-y-3">
          {(data ?? []).map((p) => (
            <li key={p.id} className="relative rounded-2xl border border-brand-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
              <h2 className="font-sans text-lg font-bold"><Link to={`/board/${p.id}`} className="after:absolute after:inset-0 hover:text-brand-700">{p.title}</Link></h2>
              <p className="text-sm text-gray-600">{p.authorName} · {p.createdAt.slice(0, 10)}</p>
            </li>
          ))}
        </ul>
      </StatusMessage>
    </div>
  )
}
