import { usePageTitle } from '../hooks/usePageTitle'

export default function About() {
  usePageTitle('교수 소개')
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">교수 소개</h1>
      <p className="text-sm bg-brand-50 rounded-lg p-3">[샘플] 아래 내용은 임시 값입니다. 실제 정보로 바꿔 주세요.</p>
      <dl className="space-y-4">
        <div><dt className="font-bold">이름</dt><dd>[샘플] 홍길동 교수</dd></div>
        <div><dt className="font-bold">소속</dt><dd>[샘플] ○○대학교 교육학과 겸임교수</dd></div>
        <div><dt className="font-bold">소개</dt><dd>[샘플] 부모교육과 교육심리를 연구하고 가르칩니다.</dd></div>
        <div>
          <dt className="font-bold">연락처 이메일</dt>
          <dd><a href="mailto:example@example.com" className="text-brand-700 underline">example@example.com</a></dd>
        </div>
      </dl>
    </div>
  )
}
