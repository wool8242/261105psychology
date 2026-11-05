// 분류별 색상·아이콘을 한곳에 모아 두어, 카드·바로가기·상세에서 같은 모양을 쓰게 합니다.
import type { ReactNode } from 'react'

interface Style {
  chip: string // 배지 색
  bar: string // 카드 윗줄 색
  icon: ReactNode
  desc: string
}

const svg = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
)

const styles: Record<string, Style> = {
  영유아기: {
    chip: 'bg-peach-100 text-peach-600', bar: 'bg-peach-400', desc: '0~7세 아이와의 하루',
    icon: svg(<><circle cx="12" cy="8" r="4" /><path d="M5 21c0-4 3-6 7-6s7 2 7 6" /></>),
  },
  아동기: {
    chip: 'bg-brand-100 text-brand-800', bar: 'bg-brand-600', desc: '초등 시기 배움과 습관',
    icon: svg(<><path d="M4 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H4z" /><path d="M20 5h-3a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h4z" /></>),
  },
  청소년기: {
    chip: 'bg-amber-100 text-amber-800', bar: 'bg-amber-500', desc: '사춘기 자녀와의 대화',
    icon: svg(<><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z" /></>),
  },
  '부모 마음돌봄': {
    chip: 'bg-rose-100 text-rose-800', bar: 'bg-rose-400', desc: '지친 부모를 위한 쉼',
    icon: svg(<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />),
  },
  논문: {
    chip: 'bg-brand-100 text-brand-800', bar: 'bg-brand-600', desc: '',
    icon: svg(<><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v4h4M10 12h6M10 16h6" /></>),
  },
  발표자료: {
    chip: 'bg-peach-100 text-peach-600', bar: 'bg-peach-400', desc: '',
    icon: svg(<><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M12 16v4M8 20h8" /></>),
  },
  수업자료: {
    chip: 'bg-amber-100 text-amber-800', bar: 'bg-amber-500', desc: '',
    icon: svg(<><path d="M3 9l9-5 9 5-9 5z" /><path d="M7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5" /></>),
  },
}

const fallback: Style = styles['아동기']

export const getCategoryStyle = (category: string): Style => styles[category] ?? fallback
