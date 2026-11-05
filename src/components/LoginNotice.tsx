// 글·댓글을 쓰려면 로그인이 필요하다는 안내와 로그인 버튼
export default function LoginNotice({ onLogin, error }: { onLogin: () => void; error: string | null }) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft space-y-2">
      <p>글과 댓글을 쓰려면 구글 로그인이 필요합니다. 읽기는 로그인 없이 가능합니다.</p>
      <p className="text-sm text-gray-600">글에는 이메일이 저장되지 않고, 직접 정한 별명만 표시됩니다.</p>
      <button type="button" onClick={onLogin} className="btn-primary">구글로 로그인</button>
      {error && <p role="alert" className="text-red-800">{error}</p>}
    </div>
  )
}
