import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '@astryxdesign/core/Button';
import AwardHighlight from './AwardHighlight.jsx';
import HeroIntro from './HeroIntro.jsx';
import DynamicGrid from './DynamicGrid.jsx';
import './hero-v2.css';

const icon = (name, size) => (
  <span aria-hidden="true" className={`material-symbols-outlined ${size}`}>
    {name}
  </span>
);

function isReload() {
  return performance.getEntriesByType('navigation')[0]?.type === 'reload';
}

function shouldPlayIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const navigation = performance.getEntriesByType('navigation')[0];
  if (window.location.hash && navigation?.type !== 'reload') return false;
  return true;
}

export default function Hero() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(shouldPlayIntro);
  const [revealed, setRevealed] = useState(!playing);
  const reveal = useCallback(() => setRevealed(true), []);
  const headingRef = useRef(null);
  const finish = useCallback(() => {
    setPlaying(false);
    setRevealed(true);
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  }, []);
  useEffect(() => {
    if (reduced && playing) finish();
  }, [reduced, playing, finish]);
  // 새로고침은 이전 스크롤 위치·해시와 무관하게 인트로 → 히어로(최상단)에서 시작한다.
  useLayoutEffect(() => {
    if (!isReload()) return;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);
  useEffect(() => {
    if (isReload()) return;
    const fragment = window.location.hash.slice(1);
    if (!fragment) return;
    const frame = requestAnimationFrame(() => {
      // Initial hash navigation can happen before React has mounted its target.
      if (window.scrollY === 0) {
        document.getElementById(fragment)?.scrollIntoView({ behavior: 'instant' });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!playing) return;
    window.addEventListener('hashchange', finish);
    return () => window.removeEventListener('hashchange', finish);
  }, [playing, finish]);
  return (
    <section
      id="home"
      className="atelier-hero atelier-hero-v2 scroll-mt-20 relative w-full"
    >
      {playing && !reduced && <HeroIntro onFinish={finish} onReveal={reveal} />}
      <motion.div className="hero-v2__grid" aria-hidden="true" initial={false} animate={{ opacity: revealed ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.6 }}><DynamicGrid /></motion.div>
      <div className="hero-v2__center">
          <motion.div className="hero-v2__role" initial={false} animate={{ opacity: revealed ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.5 }}>✦ &nbsp; AI 서비스 개발자 · 주니어 풀스택 엔지니어 &nbsp; ✦</motion.div>
          <motion.h1 ref={headingRef} tabIndex={-1} className="hero-v2__title" initial={false} animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 }} transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.12 }}>
            문제를 직시하고 정교하게 설계하여,<br />
            <span>아이디어를 실제 서비스로 구현하고 검증합니다.</span>
          </motion.h1>
          <motion.p className="hero-v2__summary" initial={false} animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 8 }} transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.25 }}>
            AI 서비스 개발자 · 주니어 풀스택 엔지니어{' '}
            <strong>한창수(Changsoo Han)</strong>
            입니다. AI 기능부터 웹 서비스와 데이터베이스까지 연결해 실제 동작하는 서비스를 구현합니다.
          </motion.p>
          <motion.div className="hero-v2__actions" initial={false} animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 8 }} transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.38 }}>
            <Button
              label="대표 프로젝트 4선 보기 ↓"
              href="#major-arcana-plates"
              icon={icon('verified', 'text-[18px]')}
              className="atelier-button atelier-button--primary inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg font-title-md text-title-md shadow-lg"
            />
            <Button
              label="서신 연락 및 제안"
              href="#celestial-dispatch"
              icon={icon('mail', 'text-[18px]')}
              className="atelier-button atelier-button--secondary inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg font-title-md text-title-md shadow"
            />
            <Button
              label="GitHub 저장소 ↗"
              href="https://github.com/changsoo2609"
              target="_blank"
              rel="noopener noreferrer"
              icon={icon('open_in_new', 'text-[16px]')}
              className="atelier-button inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-low text-on-surface-variant hover:text-primary font-label-md text-label-md"
            />
          </motion.div>
        <motion.div className="hero-v2__award" initial={false}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
          transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.55 }}>
          <AwardHighlight />
          {!reduced && (
            <button className="hero-v2__replay" type="button" onClick={() => setPlaying(true)}>
              인트로 다시 보기 <span aria-hidden="true">↻</span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
