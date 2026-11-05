interface Props {
  value: string
  onChange: (v: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div>
      <label htmlFor="search" className="block font-medium mb-1">키워드 검색</label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="예: 대화, 습관"
        className="w-full border border-gray-400 rounded-lg px-4 py-3 bg-white"
      />
    </div>
  )
}
