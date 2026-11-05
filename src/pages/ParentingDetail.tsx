import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'
import { useAsync } from '../hooks/useAsync'
import { usePageTitle } from '../hooks/usePageTitle'
import { getContentById } from '../services/contentService'

// 유튜브 주소에서 영상 id를 뽑아 개인정보 보호 도메인(youtube-nocookie.com) 임베드 주소로 만듭니다.
function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    let id: string | null = null
    if (u.hostname === 'youtu.be') id = u.pathname.slice(1)
    else if (u.hostname.endsWith('youtube.com')) {
      id = u.searchParams.get('v') ?? (u.pathname.startsWith('/embed/') ? u.pathname.split('/')[2] : null)
    }
    return id && /^[\w-]{6,}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null
  } catch {
    return null
  }
}

export default function ParentingDetail() {
  const { id = '' } = useParams()
  const { data, loading, error } = useAsync(() => getContentById(id), [id])
  const [copied, setCopied] = useState(false)
  usePageTitle(data?.title ?? '부모교육')

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('아래 주소를 복사해 주세요.', window.location.href)
    }
  }

  const embed = data?.videoUrl ? toEmbedUrl(data.videoUrl) : null

  return (
    <div>
      <Link to="/parenting" className="text-brand-700 underline">← 목록으로</Link>
      <StatusMessage loading={loading} error={error} empty={!data} emptyText="요청하신 글을 찾을 수 없습니다.">
        {data && (
          <article className="mt-4 space-y-6">
            <header className="space-y-2">
              <span className="text-sm bg-brand-100 text-brand-800 rounded-full px-3 py-1">{data.category}</span>
              <h1 className="text-2xl sm:text-3xl font-bold">{data.title}</h1>
              <p className="text-lg text-gray-700">{data.summary}</p>
              <p className="text-sm text-gray-600">{data.createdAt}</p>
            </header>

            {embed && (
              <div className="aspect-video">
                <iframe
                  src={embed}
                  title={`${data.title} 영상`}
                  className="w-full h-full rounded-xl"
                  allow="encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* 줄바꿈을 그대로 보여 주기 위해 whitespace-pre-line 사용 */}
            <div className="whitespace-pre-line text-lg leading-8">{data.body}</div>

            <div className="flex flex-wrap gap-3">
              {data.linkUrl && (
                <a href={data.linkUrl} target="_blank" rel="noopener noreferrer" className="bg-brand-700 text-white rounded-lg px-5 py-3 font-medium hover:bg-brand-800">
                  자료 보기 (새 창)
                </a>
              )}
              <button type="button" onClick={copyLink} className="border border-brand-600 text-brand-800 rounded-lg px-5 py-3 font-medium bg-white hover:bg-brand-50">
                {copied ? '주소를 복사했어요' : '이 글 주소 복사'}
              </button>
            </div>
          </article>
        )}
      </StatusMessage>
    </div>
  )
}
