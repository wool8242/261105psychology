// 목록·소개 페이지 맨 위의 제목 영역(제목 + 한 줄 안내)
export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-peach-50 border border-brand-100 px-6 py-8 sm:px-10 sm:py-10">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-peach-100/70" />
      <div aria-hidden="true" className="absolute right-16 -bottom-12 h-28 w-28 rounded-full bg-brand-100/80" />
      <h1 className="relative text-2xl sm:text-3xl font-bold text-brand-900">{title}</h1>
      {subtitle && <p className="relative mt-2 text-gray-700">{subtitle}</p>}
    </div>
  )
}
