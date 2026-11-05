import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-12 bg-brand-800 text-white">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm flex flex-col gap-2 sm:flex-row sm:justify-between">
        <p>© 부모교육 자료실 · 이 사이트의 내용은 임시 샘플입니다.</p>
        <Link to="/admin" className="underline">관리자</Link>
      </div>
    </footer>
  )
}
