import { useEffect, useRef, useState } from 'react';

const NAV = [
  { hash: '#home', label: '01. INTRO' },
  { hash: '#major-arcana-plates', label: '02. PROJECTS' },
  { hash: '#research', label: '03. RESEARCH' },
  { hash: '#skills', label: '04. TECH STACK' },
  { hash: '#celestial-dispatch', label: '05. CONTACT' },
];

const ACTIVE_CLASSES = 'bg-primary-container text-on-primary font-bold rounded-lg shadow-sm';

export default function Header({ projectFilterScrollRef }) {
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const [active, setActive] = useState(0);

  // 기존 스크립트의 헤더 높이 동기화 + 현재 섹션 표시 로직 이식
  useEffect(() => {
    const header = headerRef.current;
    const nav = navRef.current;
    const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    const sections = links.map((link) => document.getElementById(link.hash.slice(1)));

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--atelier-header-height',
        Math.ceil(header.getBoundingClientRect().height) + 'px',
      );
    };
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(header);
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);

    const updateSectionNav = () => {
      const headerBottom = header.getBoundingClientRect().bottom;
      let current = 0;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= headerBottom + 32) current = index;
      });
      const page = document.scrollingElement;
      if (
        page.scrollHeight > page.clientHeight &&
        page.scrollHeight - page.scrollTop - page.clientHeight <= 2
      ) {
        current = links.length - 1;
      }
      const filterScroll = projectFilterScrollRef.current;
      if (filterScroll !== null) {
        if (Math.abs(window.scrollY - filterScroll) <= 2) {
          current = links.findIndex((link) => link.hash === '#major-arcana-plates');
        } else {
          projectFilterScrollRef.current = null;
        }
      }
      setActive(current);
    };

    window.addEventListener('scroll', updateSectionNav, { passive: true });
    window.addEventListener('resize', updateSectionNav);
    window.addEventListener('hashchange', updateSectionNav);
    window.addEventListener('pageshow', updateSectionNav);
    updateSectionNav();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncHeaderHeight);
      window.removeEventListener('scroll', updateSectionNav);
      window.removeEventListener('resize', updateSectionNav);
      window.removeEventListener('hashchange', updateSectionNav);
      window.removeEventListener('pageshow', updateSectionNav);
    };
  }, [projectFilterScrollRef]);

  // 모바일 가로 스크롤 메뉴에서 현재 섹션 항목을 보이게 한다
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || nav.scrollWidth <= nav.clientWidth) return;
    const current = nav.querySelector('[aria-current="location"]');
    if (current) current.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [active]);

  return (
    <header
      ref={headerRef}
      className="atelier-header fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(8,18,48,0.04)]"
    >
      <div className="h-20 max-w-[1440px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-md">
        <div className="flex flex-col">
          <a className="group flex flex-col" href="#home">
            <span className="font-tarot-title text-tarot-title text-primary tracking-widest transition-colors">
              CHANGSOO HAN <span className="text-secondary font-light opacity-60 font-body-sm">//</span> PORTFOLIO
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-space-xs">
              AI 서비스 개발자 · 주니어 풀스택 엔지니어
            </span>
          </a>
        </div>
        <nav
          ref={navRef}
          aria-label="주 메뉴"
          className="hidden xl:flex items-center gap-space-xs"
          data-active-classes={ACTIVE_CLASSES}
        >
          {NAV.map((item, index) => (
            <a
              key={item.hash}
              href={item.hash}
              aria-current={active === index ? 'location' : undefined}
              className={`px-space-sm py-space-xs rounded font-label-md text-label-md hover:text-on-surface hover:bg-surface-container transition-all ${
                active === index ? ACTIVE_CLASSES : 'text-on-surface-variant'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="atelier-header-actions flex items-center gap-space-sm" data-chat-launcher-slot>
          <a
            className="hidden sm:inline-flex items-center px-space-sm py-space-xs rounded font-label-sm text-label-sm text-primary hover:bg-surface-container transition-all"
            href="https://github.com/changsoo2609"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub ↗
          </a>
          <a
            className="atelier-button atelier-button--primary inline-flex items-center px-space-md py-space-xs rounded font-label-sm text-label-sm shadow-[0_0_12px_rgba(233,195,73,0.18)]"
            href="#celestial-dispatch"
          >
            채용 문의
          </a>
        </div>
      </div>
    </header>
  );
}
