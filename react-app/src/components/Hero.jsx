import { Button } from '@astryxdesign/core/Button';
import AwardHighlight from './AwardHighlight.jsx';

const icon = (name, size) => (
  <span aria-hidden="true" className={`material-symbols-outlined ${size}`}>
    {name}
  </span>
);

// HERO SECTION: The Celestial Prologue & Astrolabe Coordinates
export default function Hero() {
  return (
    <section
      id="home"
      className="atelier-hero scroll-mt-20 relative w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin pt-space-xl pb-24"
    >
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Epigraph & Coordinates */}
        <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-lowest shadow-sm mb-space-lg">
          <span className="text-secondary font-tarot-title text-tarot-title">✦</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
            AI 서비스 개발자 · 주니어 풀스택 엔지니어
          </span>
          <span className="text-secondary font-tarot-title text-tarot-title">✦</span>
        </div>
        {/* Main Headline with Garamond Elegance */}
        <h1
          className="font-display-lg text-display-lg text-primary tracking-tight leading-tight mb-space-md"
          style={{ letterSpacing: '-0.03em', lineHeight: 1.28 }}
        >
          문제를 직시하고 정교하게 설계하여,
          <br />
          <span className="italic font-headline-xl text-headline-xl text-secondary">
            아이디어를 실제 서비스로 구현하고 검증합니다.
          </span>
        </h1>
        {/* Refined Sub-copy */}
        <p
          className="atelier-hero-summary font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed mb-space-xl"
          style={{ letterSpacing: '-0.015em', lineHeight: 1.8, wordBreak: 'keep-all' }}
        >
          AI 서비스 개발자 · 주니어 풀스택 엔지니어{' '}
          <span className="font-title-md text-primary font-semibold">한창수(Changsoo Han)</span>
          입니다. AI 기능부터 웹 서비스와 데이터베이스까지 연결해 실제 동작하는 서비스를 구현합니다.
        </p>
        <AwardHighlight />
        {/* Action Constellation */}
        <div className="hero-actions flex flex-wrap items-center justify-center gap-space-md">
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
        </div>
      </div>
    </section>
  );
}
