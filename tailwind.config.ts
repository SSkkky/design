import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',     // App Router 기준 (Next.js 13 이상)
    './pages/**/*.{js,ts,jsx,tsx}',   // Pages Router (선택적으로 포함 가능)
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // 여기서 커스텀 테마 확장 (colors, fontSize 등)
    },
    screens: {
      xs: '375px', // 커스텀 브레이크포인트 (예: 모바일용)
      'max-xs': { raw: '(max-width: 374px)' }, // max-width 예제
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
export default config
