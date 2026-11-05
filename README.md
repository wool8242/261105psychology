# 부모교육 · 연구수업 자료실 (MVP)

교육학과 겸임교수의 부모교육 콘텐츠와 연구·수업 자료를 모아 보여 주는 사이트입니다.
현재는 **Firebase 연동 전 단계**이며, 화면에 보이는 글은 모두 `[샘플]` 가상 예시입니다.

기술: Vite + React 18 + TypeScript + React Router v6 + Tailwind CSS

## 1. 로컬 실행 방법

[Node.js](https://nodejs.org) 22 버전(LTS)을 먼저 설치하세요.

```bash
npm install
npm run dev
```

터미널에 나오는 주소(보통 http://localhost:5173)를 브라우저에서 엽니다.
배포용 파일을 만들어 확인하려면 다음을 실행합니다.

```bash
npm run build
```

## 2. GitHub 업로드 방법 (초보자용)

1. https://github.com 에 로그인한 뒤 오른쪽 위 **+ → New repository**를 누릅니다.
2. 저장소 이름을 정하고 **Create repository**를 누릅니다. (README 추가 등은 체크하지 않습니다.)
3. 이 프로젝트 폴더에서 터미널을 열고 아래를 차례로 실행합니다. (주소는 본인 저장소 주소로 바꾸세요.)

```bash
git init
git add .
git commit -m "처음 올리기"
git branch -M main
git remote add origin https://github.com/내아이디/저장소이름.git
git push -u origin main
```

`.env` 파일은 `.gitignore`에 들어 있어 GitHub에 올라가지 않습니다.

## 3. Netlify 배포 방법

1. https://app.netlify.com 에 GitHub 계정으로 로그인합니다.
2. **Add new site → Import an existing project → GitHub**를 선택하고 위 저장소를 고릅니다.
3. 빌드 설정은 `netlify.toml`에 이미 들어 있어 자동으로 채워집니다.
   (확인용: Build command `npm run build`, Publish directory `dist`)
4. **Deploy**를 누르면 몇 분 뒤 주소가 생깁니다. 이후 GitHub에 올릴 때마다 자동으로 다시 배포됩니다.

상세 페이지에서 새로고침해도 오류가 나지 않도록 `netlify.toml`에 SPA 리다이렉트가 설정되어 있습니다.

## 4. 샘플 콘텐츠를 실제 내용으로 바꾸는 방법

`src/data/sampleContents.ts` 파일을 엽니다. 글 하나가 `{ ... }` 한 덩어리입니다.

- `title`, `summary`, `body`: 제목, 요약, 본문 (본문 줄바꿈은 `\n`)
- `category`: 부모교육은 `영유아기` / `아동기` / `청소년기` / `부모 마음돌봄`, 연구·수업 자료는 `논문` / `발표자료` / `수업자료`
- `videoUrl`: 유튜브 주소 (없으면 줄 삭제)
- `linkUrl`: 구글 드라이브 등 자료 링크 (없으면 줄 삭제)
- `published`: `false`로 하면 화면에 나타나지 않음
- 내용을 바꾼 뒤에는 제목·본문의 `[샘플]` 표시를 지우세요.
- `src/pages/About.tsx`의 교수 소개(이름, 소속, 이메일)도 실제 정보로 바꿉니다.

## 5. 다음 단계: Firebase 연동 (Spark 무료 요금제)

- **바꿀 파일**: `src/services/contentService.ts` 하나입니다. `getContents`, `getContentById`를 Firestore 호출로 교체하면 페이지 코드는 그대로 동작합니다.
- **추가할 것**
  1. `npm install firebase`, Firebase 콘솔에서 프로젝트 생성 후 `.env`에 `VITE_FIREBASE_*` 4개 값 입력 (Netlify 환경변수에도 동일하게 등록)
  2. Firestore 컬렉션 `contents` (필드는 `src/types/content.ts`와 동일)
  3. 구글 로그인 (Authentication) 및 `/admin` 페이지 구현
  4. 관리자 이메일 판별 (허용한 교수님 이메일만 쓰기 가능)
  5. 보안 규칙: 누구나 `published == true`인 글 읽기, 쓰기는 관리자 이메일만 허용
- Cloud Functions, Cloud Storage 등 유료 기능은 쓰지 않습니다. 자료는 외부 링크로 연결합니다.
