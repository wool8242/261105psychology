/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 주색: 차분한 청록 / 보조색: 따뜻한 살구·황토 (2색 중심)
        cream: '#fbf6ee',
        brand: { 50: '#eef6f5', 100: '#d5e9e6', 200: '#addbd5', 600: '#2f7a73', 700: '#256059', 800: '#1d4c47', 900: '#12302d' },
        peach: { 50: '#fff3ea', 100: '#ffe3d0', 400: '#f0a173', 600: '#b8582a' },
        ink: '#2b2a28',
      },
      fontFamily: {
        // 외부 폰트 서버 요청(방문자 정보 전달)을 피하려고 시스템 글꼴만 사용
        sans: ['"Pretendard"', '"Noto Sans KR"', '"Apple SD Gothic Neo"', '"Malgun Gothic"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif KR"', '"Nanum Myeongjo"', '"Batang"', '"AppleMyungjo"', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 4px rgba(37,96,89,.05), 0 8px 24px rgba(37,96,89,.08)',
        lift: '0 4px 8px rgba(37,96,89,.08), 0 16px 32px rgba(37,96,89,.14)',
      },
    },
  },
  plugins: [],
}
