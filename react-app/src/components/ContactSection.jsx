import { useState } from 'react';
import { Button } from '@astryxdesign/core/Button';

const EMAIL = 'changsoo2609@gmail.com';

// SECTION IV: CELESTIAL DISPATCH & CONTACT (서신 및 채용 문의)
export default function ContactSection() {
  const [copyStatus, setCopyStatus] = useState('');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus('이메일 주소를 복사했습니다.');
    } catch {
      setCopyStatus('복사할 수 없습니다. 위 이메일 링크를 사용해 주세요.');
    }
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin py-24" id="celestial-dispatch">
      <div className="bg-surface-container-lowest rounded-2xl p-space-xl lg:p-24 shadow-2xl relative overflow-hidden">
        {/* Astronomical Watermark */}
        <div className="absolute -right-20 -bottom-20 opacity-5 text-primary pointer-events-none select-none">
          <span aria-hidden="true" className="material-symbols-outlined text-[360px]">
            explore
          </span>
        </div>
        <div className="max-w-3xl relative z-10">
          <div className="mb-space-xs">
            <span
              className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-space-xs"
              style={{ letterSpacing: '0.08em', lineHeight: 1.5 }}
            >
              05. CONTACT & RECRUITMENT // 신뢰할 수 있는 코드로 기여하겠습니다
            </span>
          </div>
          <h2
            className="atelier-section-title font-headline-xl text-headline-xl text-primary mb-space-md"
            style={{ letterSpacing: '-0.025em', lineHeight: 1.3 }}
          >
            정교한 코드와 실행력으로
            <br />
            팀의 프로덕트에 기여할 준비가 되어 있습니다.
          </h2>
          <p
            className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-space-xl"
            style={{ letterSpacing: '-0.015em', lineHeight: 1.8, wordBreak: 'keep-all' }}
          >
            AI 서비스 개발자 및 주니어 풀스택 엔지니어 포지션 제안, 프로젝트 협업, 기술 문의 등 어떤 형태의
            대화든 환영합니다. 아래 이메일로 전해주시면 신속히 답신 드리겠습니다.
          </p>
          {/* Direct Contact Elements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mb-space-xl">
            {/* Email Box with Copy Feature */}
            <div className="atelier-card p-space-lg bg-surface-container-low rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-on-surface-variant mb-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">DIRECT EMAIL</span>
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-secondary">
                    mail
                  </span>
                </div>
                <div className="font-title-md text-title-md text-primary font-mono select-all">
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </div>
              <Button
                id="copy-email"
                type="button"
                label="이메일 주소 복사하기"
                onClick={copyEmail}
                icon={
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                    content_copy
                  </span>
                }
                className="mt-space-md inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-primary transition-colors self-start"
              />
              <p id="copy-status" role="status" className="font-body-sm text-body-sm text-on-surface-variant">
                {copyStatus}
              </p>
            </div>
            {/* GitHub Channel */}
            <div className="atelier-card p-space-lg bg-surface-container-low rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-on-surface-variant mb-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">
                    CODE REPOSITORY
                  </span>
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-secondary">
                    terminal
                  </span>
                </div>
                <div className="font-title-md text-title-md text-primary font-mono">
                  github.com/changsoo2609
                </div>
              </div>
              <Button
                label="GitHub 프로필 방문"
                href="https://github.com/changsoo2609"
                target="_blank"
                rel="noopener noreferrer"
                icon={
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                    arrow_outward
                  </span>
                }
                className="mt-space-md inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-primary transition-colors self-start"
              />
            </div>
          </div>
          {/* Quick Summary Note */}
          <div className="flex flex-wrap items-center gap-space-md pt-space-md text-on-surface-variant font-label-sm text-label-sm">
            <span className="flex items-center gap-1 text-primary">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              입사 지원 및 즉시 온보딩 가능
            </span>
            <span>·</span>
            <span>근무 형태: 오피스 / 하이브리드 / 원격</span>
            <span>·</span>
            <span>희망 직무: AI 서비스 개발자 · 주니어 풀스택 엔지니어</span>
          </div>
        </div>
      </div>
    </section>
  );
}
