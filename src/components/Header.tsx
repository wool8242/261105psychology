import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/parenting', label: '부모교육' },
  { to: '/board', label: '게시판' },
  { to: '/research', label: '연구·수업 자료' },
  { to: '/about', label: '교수 소개' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 md:py-2 rounded-full font-medium transition ${isActive ? 'bg-brand-700 text-white' : 'text-ink hover:bg-brand-50'}`

  return (
    // 스크롤해도 메뉴가 보이도록 상단 고정
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-brand-100">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-white">
        본문 바로가기
      </a>
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        {/* 로고 이미지 대신 심볼(SVG) + 텍스트 로고 */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-brand-800 font-serif">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-brand-700 text-white" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
          </span>
          부모교육 자료실
        </Link>
        {/* 모바일에서는 버튼으로 메뉴를 열고 닫습니다 */}
        <button
          type="button"
          className="md:hidden px-4 py-2 border-2 border-brand-600 rounded-full text-brand-800 font-medium"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? '메뉴 닫기' : '메뉴 열기'}
        </button>
        <nav
          id="main-nav"
          aria-label="주요 메뉴"
          className={`${open ? 'block' : 'hidden'} md:block absolute md:static left-0 right-0 top-full bg-white p-3 md:p-0 shadow-lift md:shadow-none border-b md:border-0 border-brand-100`}
        >
          <ul className="md:flex md:gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={linkClass} onClick={() => setOpen(false)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
