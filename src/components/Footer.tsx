import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-900 text-brand-100">
      <div className="mx-auto max-w-5xl px-4 py-10 grid gap-8 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <p className="font-serif text-xl font-bold text-white mb-2">부모교육 자료실</p>
          <p className="text-sm">교육학 연구와 수업을 바탕으로, 부모님의 하루에 도움이 되는 이야기를 나눕니다.</p>
        </div>
        <nav aria-label="바닥 메뉴">
          <ul className="space-y-1 text-sm">
            <li><Link to="/parenting" className="underline-offset-4 hover:underline">부모교육</Link></li>
            <li><Link to="/research" className="underline-offset-4 hover:underline">연구·수업 자료</Link></li>
            <li><Link to="/about" className="underline-offset-4 hover:underline">교수 소개</Link></li>
            <li><Link to="/admin" className="underline-offset-4 hover:underline">관리자</Link></li>
          </ul>
        </nav>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs">이 사이트의 모든 내용은 임시 [샘플]입니다.</p>
    </footer>
  )
}
