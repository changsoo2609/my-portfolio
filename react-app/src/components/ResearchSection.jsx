import { motion, useReducedMotion } from 'motion/react';

// SECTION II: OBSERVATORY & LAB EXPERIMENTS (천체 관측실 / 연구 기록)
export default function ResearchSection() {
  const reduced = useReducedMotion();
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
  const reveal = (delay) => reduced ? {} : { initial: { opacity: 0.55, y: mobile ? 24 : 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 }, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } };
  return (
    <section
      id="research"
      className="scroll-mt-20 w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin py-24"
    >
      <div className="flex flex-col mb-space-xl">
        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-space-xs">
          03. LAB EXPERIMENTS // 기술 검증 및 연구 기록
        </span>
        <h2
          className="atelier-section-title font-headline-lg text-headline-lg text-primary"
          style={{ letterSpacing: '-0.025em', lineHeight: 1.3 }}
        >
          기술적 가설과 데이터 기반의 검증 일지
        </h2>
        <p
          className="font-body-md text-body-md text-on-surface-variant mt-space-xs"
          style={{ letterSpacing: '-0.012em', lineHeight: 1.75, wordBreak: 'keep-all' }}
        >
          생성 결과의 일관성과 단위 테스트 범위를 살펴본 실험 주제입니다.
        </p>
      </div>
      {/* Lab Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
        {/* Lab 01 Plate */}
        <motion.div {...reveal(0)} className="bg-surface-container-lowest rounded-xl p-space-xl shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between pb-space-sm mb-space-md">
            <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
              LAB EXP 01 // GENERATIVE AI PIPELINE
            </span>
            <span className="font-mono font-label-sm text-label-sm text-on-surface-variant">
              CONSISTENCY CHECK
            </span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              ComfyUI 노드 기반 일관성 제어 실험
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg">
              반복 생성 시 캐릭터 및 배경의 시각적 일관성이 붕괴되는 문제를 해결하기 위해, ControlNet과
              IP-Adapter 노드를 결합한 워크플로우를 구성하고 시드와 프롬프트 가중치를 바꿨을 때의 결과를
              비교하는 실험입니다.
            </p>
            {/* Metric Highlight */}
            <div className="grid grid-cols-2 gap-space-md p-space-md bg-surface-container-low rounded-lg mb-space-md">
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                  프롬프트 일관성 비교
                </div>
                <div className="font-headline-lg text-headline-lg text-primary mt-1">SSIM</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">SSIM 유사도 지표 기준</div>
              </div>
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                  재실행 파이프라인 검증
                </div>
                <div className="font-headline-lg text-headline-lg text-secondary mt-1">재실행</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">시드·프롬프트 조건 기록</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              ComfyUI · IP-Adapter · Stable Diffusion
            </span>
            <span aria-hidden="true" className="material-symbols-outlined text-secondary text-[20px]">
              science
            </span>
          </div>
        </motion.div>
        {/* Lab 02 Plate */}
        <motion.div {...reveal(0.08)} className="bg-surface-container-lowest rounded-xl p-space-xl shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between pb-space-sm mb-space-md">
            <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
              LAB EXP 02 // QUALITY ENGINEERING & TESTING
            </span>
            <span className="font-mono font-label-sm text-label-sm text-on-surface-variant">TEST DESIGN</span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              AI 보조 도구를 통한 단위 테스트 보강 실험
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg">
              개발 생산성을 유지하면서도 신뢰성을 확보하기 위해, Claude 및 LLM 도구를 활용하여 엣지 케이스
              테스트 케이스를 자동 도출하고 PyTest와 모킹을 사용해 외부 의존성을 분리하는 실험입니다.
            </p>
            {/* Metric Highlight */}
            <div className="grid grid-cols-2 gap-space-md p-space-md bg-surface-container-low rounded-lg mb-space-md">
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                  반복 테스트 구성
                </div>
                <div className="font-headline-lg text-headline-lg text-primary mt-1">Mocking</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  외부 의존성과 예외 상황 분리
                </div>
              </div>
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                  핵심 로직 테스트 커버리지
                </div>
                <div className="font-headline-lg text-headline-lg text-secondary mt-1">Coverage</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  핵심 로직의 테스트 범위 확인
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              PyTest · Coverage.py · Unit Mocking
            </span>
            <span aria-hidden="true" className="material-symbols-outlined text-secondary text-[20px]">
              verified
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
