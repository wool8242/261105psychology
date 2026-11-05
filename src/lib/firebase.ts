// Firebase 초기화 (Spark 무료 요금제: Firestore, Authentication만 사용 예정)
// 방문자 정보를 수집하지 않기 위해 Analytics는 넣지 않았습니다.
// 값은 .env(로컬)와 Netlify 환경변수에서 읽습니다. 웹 API 키는 비밀번호가 아니며,
// 실제 보호는 Firestore 보안 규칙이 담당합니다.
import { initializeApp } from 'firebase/app'

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

export default app
