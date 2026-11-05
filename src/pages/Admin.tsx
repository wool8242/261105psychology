import { usePageTitle } from '../hooks/usePageTitle'

// 자리표시 화면입니다. 로그인 기능은 Firebase 연동 단계에서 구현합니다.
export default function Admin() {
  usePageTitle('관리자')
  return (
    <div className="max-w-xl space-y-3">
      <h1 className="text-2xl font-bold">관리자 페이지</h1>
      <p className="bg-white border border-brand-100 rounded-xl p-5">Firebase 연동 후 활성화됩니다.</p>
    </div>
  )
}
