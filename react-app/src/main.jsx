import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Astryx: 로드 순서가 캐스케이드 레이어를 결정한다 (reset → components → theme).
// 기존 디자인 CSS는 레이어 밖(unlayered)이므로 항상 우선한다.
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import '@astryxdesign/theme-neutral/theme.css';
import './react-bridge.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
