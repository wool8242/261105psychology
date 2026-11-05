import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/parenting', label: '부모교육' },
  { to: '/research', label: '연구·수업 자료' },
  { to: '/about', label: '교수 소개' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-3 rounded-lg font-medium ${isActive ? 'bg-brand-100 text-brand-800' : 'text-ink hover:bg-brand-50'}`

  return (
    <header className="relative bg-white border-b border-brand-100">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-white">
        본문 바로가기
      </a>
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        {/* 로고 이미지 대신 텍스트 로고 */}
        <Link to="/" className="text-xl font-bold text-brand-700">
          부모교육 자료실
        </Link>
        {/* 모바일에서는 버튼으로 메뉴를 열고 닫습니다 */}
        <button
          type="button"
          className="md:hidden px-3 py-2 border border-brand-600 rounded-lg text-brand-700"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? '메뉴 닫기' : '메뉴 열기'}
        </button>
        <nav id="main-nav" aria-label="주요 메뉴" className={`${open ? 'block' : 'hidden'} md:block absolute md:static left-0 right-0 top-[60px] bg-white p-3 md:p-0 shadow md:shadow-none z-10`}>
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
