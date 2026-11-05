/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 따뜻한 베이지 배경 + 차분한 청록(주색) 두 가지 중심
        cream: '#fbf7f0',
        brand: { 50: '#eef6f5', 100: '#d5e9e6', 600: '#2f7a73', 700: '#256059', 800: '#1d4c47' },
        ink: '#2b2a28',
      },
      fontFamily: {
        sans: ['"Pretendard"', '"Noto Sans KR"', '"Apple SD Gothic Neo"', '"Malgun Gothic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
