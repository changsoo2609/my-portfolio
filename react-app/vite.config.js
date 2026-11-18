import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages는 main 브랜치 docs/ 폴더를 그대로 서비스하므로
// 빌드 결과는 react-app/dist 별도 디렉터리에 생성된다.
export default defineConfig({
  base: '/my-portfolio/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
