import { Badge } from '@astryxdesign/core/Badge';

const TECH_CHIPS = ['PostgreSQL', 'FastAPI', 'Supabase', 'REST API'];

// Royal Award Medallion / Verification Seal
export default function AwardHighlight() {
  return (
    <div className="hero-award w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-xl relative overflow-hidden mb-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md text-left">
      <div className="absolute -right-8 -bottom-8 opacity-5 text-primary pointer-events-none select-none">
        <span aria-hidden="true" className="material-symbols-outlined text-[140px]">
          workspace_premium
        </span>
      </div>
      <div className="atelier-award-copy flex items-center gap-space-md z-10">
        <div className="w-14 h-14 rounded-full bg-secondary-fixed/50 flex items-center justify-center shrink-0 shadow-inner">
          <span aria-hidden="true" className="material-symbols-outlined text-secondary text-[32px]">
            military_tech
          </span>
        </div>
        <div>
          <div className="flex items-center gap-space-xs">
            <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold tracking-wider uppercase">
              FIRST PRIZE // 1위
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">2026 TEAM AWARD</span>
          </div>
          <h2 className="atelier-section-title font-title-lg text-title-lg text-primary mt-1">
            2026 전남광주 청년(YOUTH) AI 솔버톤 최우수상
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            농담(農談) 팀 수상 · 밭머리 프로젝트에서 FastAPI와 Supabase로 접근 권한과 작업 전달 API를 구현했습니다.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-space-xs shrink-0 z-10">
        {TECH_CHIPS.map((chip) => (
          <Badge
            key={chip}
            label={chip}
            className="inline-flex items-center px-space-sm py-1 rounded bg-surface-container font-label-sm text-label-sm text-primary"
          />
        ))}
      </div>
    </div>
  );
}
