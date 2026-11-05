interface Props {
  value: string
  onChange: (v: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div>
      <label htmlFor="search" className="block font-semibold mb-2">키워드 검색</label>
      <div className="relative">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-600" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
        <input
          id="search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="예: 대화, 습관"
          className="w-full rounded-full border-2 border-brand-200 bg-white pl-12 pr-5 py-3 shadow-soft focus:border-brand-600"
        />
      </div>
    </div>
  )
}
