import { Theme } from '@astryxdesign/core/theme';
import { LinkProvider } from '@astryxdesign/core/Link';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProjectSection from './components/ProjectSection.jsx';
import ResearchSection from './components/ResearchSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import { useRef } from 'react';

// Astryx의 href 렌더링이 네이티브 앵커를 그대로 쓰도록 연결한다.
function DefaultLink({ href, children, ...rest }) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

// Celestial Ambient Constellation Backdrop Layer
function CelestialBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-fixed/20 blur-3xl opacity-50"></div>
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-tertiary-fixed/30 blur-3xl opacity-60"></div>
      <div className="absolute top-2/3 left-1/4 w-[24rem] h-[24rem] rounded-full bg-secondary-fixed/15 blur-3xl opacity-40"></div>
      <svg
        aria-hidden="true"
        focusable="false"
        className="w-full h-full opacity-20 text-outline"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern height="160" id="celestial-grid" patternUnits="userSpaceOnUse" width="160">
            <circle cx="80" cy="80" fill="currentColor" r="0.75"></circle>
            <line stroke="currentColor" stroke-width="0.5" x1="80" x2="80" y1="76" y2="84"></line>
            <line stroke="currentColor" stroke-width="0.5" x1="76" x2="84" y1="80" y2="80"></line>
          </pattern>
        </defs>
        <rect fill="url(#celestial-grid)" height="100%" width="100%"></rect>
      </svg>
    </div>
  );
}

export default function App() {
  // 필터 클릭 직후 내비게이션이 PROJECTS를 유지하도록 하는 스크롤 기록 (기존 스크립트 로직 이식)
  const projectFilterScrollRef = useRef(null);

  return (
    <Theme theme={neutralTheme}>
      <LinkProvider component={DefaultLink}>
        <a className="atelier-skip-link" href="#main-content">
          본문 바로가기
        </a>
        <Header projectFilterScrollRef={projectFilterScrollRef} />
        <main id="main-content" tabIndex={-1} className="w-full bg-surface min-h-[calc(100vh-80px)]">
          <div className="flex flex-col w-full relative">
            <CelestialBackdrop />
            <Hero />
            <ProjectSection projectFilterScrollRef={projectFilterScrollRef} />
            <ResearchSection />
            <SkillsSection />
            <ContactSection />
          </div>
        </main>
        <Footer />
        <ChatWidget />
      </LinkProvider>
    </Theme>
  );
}
