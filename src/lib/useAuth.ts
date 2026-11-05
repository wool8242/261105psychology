// 구글 로그인 상태 관리. 관리자 화면에서만 불러 쓰므로 일반 방문자에게는 로드되지 않습니다.
import { useEffect, useState } from 'react'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth'
import app from './firebase'

const auth = getAuth(app)
// 화면 표시용 관리자 판별. 진짜 권한 확인은 Firestore 보안 규칙에서 합니다.
const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS ?? '').split(',').map((e: string) => e.trim().toLowerCase()).filter(Boolean)

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setReady(true) }), [])

  const login = async () => {
    setError(null)
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
    } catch (e) {
      // 원인을 알 수 있도록 Firebase 오류 코드를 함께 보여 줍니다 (예: auth/unauthorized-domain)
      const code = (e as { code?: string }).code ?? 'unknown'
      setError(`로그인하지 못했습니다. 팝업 차단을 풀고 다시 시도해 주세요. (오류 코드: ${code})`)
    }
  }
  const isAdmin = !!user?.email && adminEmails.includes(user.email.toLowerCase())
  return { user, ready, isAdmin, error, login, logout: () => signOut(auth) }
}
