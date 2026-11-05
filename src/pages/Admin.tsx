import PageHeader from '../components/PageHeader'
import { usePageTitle } from '../hooks/usePageTitle'

// 자리표시 화면입니다. 로그인 기능은 Firebase 연동 단계에서 구현합니다.
export default function Admin() {
  usePageTitle('관리자')
  return (
    <div className="space-y-6">
      <PageHeader title="관리자 페이지" />
      <p className="rounded-2xl border-2 border-dashed border-brand-200 bg-white p-8 text-center text-lg">
        Firebase 연동 후 활성화됩니다.
      </p>
    </div>
  )
}
