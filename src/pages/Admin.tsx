import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import StatusMessage from '../components/StatusMessage'
import { useAsync } from '../hooks/useAsync'
import { usePageTitle } from '../hooks/usePageTitle'
import { useAuth } from '../lib/useAuth'
import { sampleContents } from '../data/sampleContents'
import { deleteContent, getAllContentsForAdmin, saveContent } from '../services/contentService'
import { PARENTING_CATEGORIES, type Content } from '../types/content'

const RESEARCH_CATEGORIES = ['논문', '발표자료', '수업자료']
const empty = (): Content => ({
  id: '', type: 'parenting', title: '', summary: '', body: '', category: PARENTING_CATEGORIES[0], tags: [],
  createdAt: new Date().toISOString().slice(0, 10), published: false,
})

const input = 'w-full rounded-lg border-2 border-brand-200 bg-white px-3 py-2'

export default function Admin() {
  usePageTitle('관리자')
  const { user, ready, isAdmin, error, login, logout } = useAuth()

  return (
    <div className="space-y-6">
      <PageHeader title="관리자 페이지" subtitle="글을 등록·수정·삭제합니다." />
      {!ready ? (
        <p role="status">확인 중입니다…</p>
      ) : !user ? (
        <div className="rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-soft space-y-3">
          <p>관리자 구글 계정으로 로그인해 주세요.</p>
          <button type="button" onClick={login} className="btn-primary">구글로 로그인</button>
          {error && <p role="alert" className="text-red-800">{error}</p>}
        </div>
      ) : !isAdmin ? (
        <div className="rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-soft space-y-3">
          <p role="alert">{user.email} 계정은 관리자 권한이 없습니다.</p>
          <button type="button" onClick={logout} className="btn-outline">로그아웃</button>
        </div>
      ) : (
        <Manager email={user.email ?? ''} onLogout={logout} />
      )}
    </div>
  )
}

function Manager({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [version, setVersion] = useState(0) // 저장·삭제 후 목록을 다시 불러오기 위한 값
  const { data, loading, error } = useAsync(() => getAllContentsForAdmin(), [version])
  const [form, setForm] = useState<Content | null>(null)
  const [msg, setMsg] = useState('')

  const run = async (job: () => Promise<void>, done: string) => {
    setMsg('')
    try {
      await job()
      setMsg(done)
      setVersion((v) => v + 1)
    } catch {
      setMsg('실패했습니다. 관리자 이메일과 보안 규칙 설정을 확인해 주세요.')
    }
  }

  // 처음 한 번, 샘플 글을 Firestore로 옮깁니다. 같은 id로 저장하므로 여러 번 눌러도 중복되지 않습니다.
  const seed = () => run(async () => { for (const c of sampleContents) await saveContent(c) }, '샘플 글을 불러왔습니다.')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p>{email} 로그인 중</p>
        <div className="flex gap-2">
          <button type="button" className="btn-primary" onClick={() => setForm(empty())}>새 글 쓰기</button>
          <button type="button" className="btn-outline" onClick={onLogout}>로그아웃</button>
        </div>
      </div>
      {msg && <p role="status" className="rounded-lg bg-brand-50 p-3">{msg}</p>}

      {form && <Editor key={form.id || 'new'} initial={form} onCancel={() => setForm(null)}
        onSave={(c) => run(async () => { await saveContent(c); setForm(null) }, '저장했습니다.')} />}

      <StatusMessage loading={loading} error={error} empty={!data?.length} emptyText="등록된 글이 없습니다. 아래 버튼으로 샘플 글을 불러오거나 새 글을 써 보세요.">
        <ul className="space-y-2">
          {(data ?? []).map((c) => (
            <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-brand-100 bg-white p-4">
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="text-sm text-gray-600">{c.category} · {c.createdAt} · {c.published ? '공개' : '비공개'}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-outline !py-1" onClick={() => setForm(c)}>수정</button>
                <button type="button" className="btn-outline !py-1 !border-red-700 !text-red-800"
                  onClick={() => window.confirm('정말 삭제할까요? 되돌릴 수 없습니다.') && run(() => deleteContent(c.id), '삭제했습니다.')}>삭제</button>
              </div>
            </li>
          ))}
        </ul>
      </StatusMessage>
      <button type="button" className="btn-outline" onClick={seed}>샘플 글 불러오기 (처음 한 번)</button>
    </div>
  )
}

function Editor({ initial, onSave, onCancel }: { initial: Content; onSave: (c: Content) => void; onCancel: () => void }) {
  const [c, setC] = useState<Content>(initial)
  const [tags, setTags] = useState(initial.tags.join(', '))
  const set = <K extends keyof Content>(k: K, v: Content[K]) => setC((p) => ({ ...p, [k]: v }))
  const cats = c.type === 'parenting' ? [...PARENTING_CATEGORIES] : RESEARCH_CATEGORIES

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...c, tags: tags.split(',').map((t) => t.trim()).filter(Boolean), videoUrl: c.videoUrl?.trim() || undefined, linkUrl: c.linkUrl?.trim() || undefined })
  }
  const field = (label: string, el: React.ReactNode, id: string) => (
    <div><label htmlFor={id} className="block font-semibold mb-1">{label}</label>{el}</div>
  )

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold">{c.id ? '글 수정' : '새 글 쓰기'}</h2>
      {field('종류', <select id="type" className={input} value={c.type} onChange={(e) => {
        const t = e.target.value as Content['type']
        setC((p) => ({ ...p, type: t, category: t === 'parenting' ? PARENTING_CATEGORIES[0] : t === 'lecture' ? '수업자료' : '논문' }))
      }}><option value="parenting">부모교육</option><option value="research">연구</option><option value="lecture">수업</option></select>, 'type')}
      {field('분류', <select id="cat" className={input} value={c.category} onChange={(e) => set('category', e.target.value)}>{cats.map((x) => <option key={x}>{x}</option>)}</select>, 'cat')}
      {field('제목', <input id="title" required className={input} value={c.title} onChange={(e) => set('title', e.target.value)} />, 'title')}
      {field('요약', <input id="sum" required className={input} value={c.summary} onChange={(e) => set('summary', e.target.value)} />, 'sum')}
      {field('본문', <textarea id="body" required rows={8} className={input} value={c.body} onChange={(e) => set('body', e.target.value)} />, 'body')}
      {field('태그 (쉼표로 구분)', <input id="tags" className={input} value={tags} onChange={(e) => setTags(e.target.value)} />, 'tags')}
      {field('유튜브 주소 (선택)', <input id="video" type="url" className={input} value={c.videoUrl ?? ''} onChange={(e) => set('videoUrl', e.target.value)} />, 'video')}
      {field('자료 링크 (선택, 구글 드라이브 등)', <input id="link" type="url" className={input} value={c.linkUrl ?? ''} onChange={(e) => set('linkUrl', e.target.value)} />, 'link')}
      {field('날짜', <input id="date" type="date" required className={input} value={c.createdAt} onChange={(e) => set('createdAt', e.target.value)} />, 'date')}
      <label className="flex items-center gap-2 font-semibold"><input type="checkbox" className="h-5 w-5" checked={c.published} onChange={(e) => set('published', e.target.checked)} />공개하기</label>
      <div className="flex gap-2">
        <button type="submit" className="btn-primary">저장</button>
        <button type="button" className="btn-outline" onClick={onCancel}>취소</button>
      </div>
    </form>
  )
}
