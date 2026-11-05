import type { Content } from '../types/content'
import ContentCard from './ContentCard'

export default function ContentGrid({ items }: { items: Content[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => <ContentCard key={c.id} content={c} />)}
    </div>
  )
}
