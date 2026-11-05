import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('페이지를 찾을 수 없음')
  return (
    <div className="text-center space-y-4 py-10">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p>주소가 바뀌었거나 없는 페이지입니다.</p>
      <Link to="/" className="inline-block bg-brand-700 text-white rounded-lg px-5 py-3 font-medium">홈으로 가기</Link>
    </div>
  )
}
