import PageHeader from '../components/PageHeader'
import { usePageTitle } from '../hooks/usePageTitle'

export default function About() {
  usePageTitle('교수 소개')
  return (
    <div className="space-y-6">
      <PageHeader title="교수 소개" subtitle="[샘플] 아래 내용은 임시 값입니다. 실제 정보로 바꿔 주세요." />
      <section className="flex flex-col gap-6 rounded-3xl border border-brand-100 bg-white p-6 shadow-soft sm:flex-row sm:p-8">
        {/* 사진이 없으므로 이니셜 아바타로 대체 (사진을 넣을 때 이 부분을 img로 교체) */}
        <div role="img" aria-label="프로필 사진 자리" className="grid h-28 w-28 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 font-serif text-4xl text-white">
          홍
        </div>
        <dl className="space-y-4">
          <div><dt className="text-sm font-semibold text-brand-700">이름</dt><dd className="text-lg font-bold">[샘플] 홍길동 교수</dd></div>
          <div><dt className="text-sm font-semibold text-brand-700">소속</dt><dd>[샘플] ○○대학교 교육학과 겸임교수</dd></div>
          <div><dt className="text-sm font-semibold text-brand-700">소개</dt><dd>[샘플] 부모교육과 교육심리를 연구하고 가르칩니다.</dd></div>
          <div>
            <dt className="text-sm font-semibold text-brand-700">연락처 이메일</dt>
            <dd><a href="mailto:example@example.com" className="font-semibold text-brand-700 underline underline-offset-4">example@example.com</a></dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
