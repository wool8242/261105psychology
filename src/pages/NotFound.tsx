import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('페이지를 찾을 수 없음')
  return (
    <div className="space-y-4 py-16 text-center">
      <p className="font-serif text-7xl font-bold text-brand-200" aria-hidden="true">404</p>
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="text-gray-700">주소가 바뀌었거나 없는 페이지입니다.</p>
      <Link to="/" className="btn-primary">홈으로 가기</Link>
    </div>
  )
}
