import { motion, useReducedMotion } from 'motion/react';
import { Badge } from '@astryxdesign/core/Badge';

const DEFAULT_BADGE_CLASS =
  'px-space-xs py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-primary';
const AWARD_BADGE_CLASS =
  'px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold tracking-wider flex items-center gap-1 shadow-sm';
const CHIP_CLASS = 'atelier-chip px-2 py-0.5 font-label-sm text-label-sm';

function isExternal(href) {
  return href.startsWith('http');
}

export default function ProjectCard({ project: p, index }) {
  const reduced = useReducedMotion();
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
  // 포인터 환경 판별은 렌더 시 1회 읽기 — 포인터 움직임으로 리렌더를 유발하지 않는다.
  const finePointer =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const badgeClass = p.badgeVariant === 'award' ? AWARD_BADGE_CLASS : DEFAULT_BADGE_CLASS;

  return (
    <motion.article
      layout={reduced ? false : 'position'}
      initial={reduced ? false : { opacity: 0.55, y: mobile ? 12 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={
        finePointer && !reduced ? { y: -8, transition: { duration: 0.2 } } : undefined
      }
      exit={
        reduced
          ? { opacity: 0, transition: { duration: 0 } }
          : { opacity: 0, scale: 0.98, transition: { duration: 0.18, ease: 'easeOut' } }
      }
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : index * 0.06,
        ease: [0.16, 1, 0.3, 1],
        layout: { duration: 0.35, delay: 0, ease: [0.16, 1, 0.3, 1] },
      }}
      className={`arcana-card atelier-card bg-surface-container-lowest rounded-xl p-space-xl ${p.cardClass} flex flex-col justify-between relative overflow-hidden`}
      data-arcana={p.key}
    >
      <div aria-hidden="true" className="arcana-card__deco absolute top-0 right-0 w-32 h-32 bg-secondary-fixed/20 rounded-bl-full pointer-events-none" />
      <div>
        {/* Plate Header */}
        <div className="flex items-center justify-between pb-space-md mb-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="font-tarot-title text-tarot-title text-secondary">{p.num}</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
              {p.label}
            </span>
          </div>
          <Badge
            label={p.badge}
            icon={
              p.badgeVariant === 'award' ? (
                <span aria-hidden="true" className="material-symbols-outlined text-[13px]">
                  award_star
                </span>
              ) : undefined
            }
            className={badgeClass}
          />
        </div>
        {/* Title & Subtitle */}
        <h3 className="font-headline-lg text-headline-lg text-primary transition-colors">
          {p.title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1 mb-space-md">{p.subtitle}</p>
        {/* Solved Problem Block */}
        <div className="p-space-md bg-surface-container-low rounded-lg mb-space-md">
          <div className="flex items-center gap-space-xs text-primary font-title-md text-title-md mb-1">
            <span aria-hidden="true" className="material-symbols-outlined text-[16px] text-secondary">
              {p.problemIcon}
            </span>
            <span>해결한 핵심 문제 (Core Solved Problem)</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed atelier-detail">
            {p.problem}
          </p>
        </div>
        {/* Engineering Schematic Details */}
        <div className="space-y-space-xs mb-space-lg">
          <div className="flex items-start gap-space-xs">
            <span className="atelier-detail-label text-secondary font-semibold font-label-sm text-label-sm">
              ✦ 본인 기여
            </span>
            <span className="font-body-sm text-body-sm text-on-surface atelier-detail">{p.contribution}</span>
          </div>
          <div className="flex items-start gap-space-xs">
            <span className="atelier-detail-label text-secondary font-semibold font-label-sm text-label-sm">
              ✦ 구현 근거
            </span>
            <span className="font-body-sm text-body-sm text-on-surface atelier-detail">{p.evidence}</span>
          </div>
        </div>
        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 mb-space-lg">
          {p.chips.map((chip) => (
            <Badge key={chip} label={chip} className={CHIP_CLASS} />
          ))}
        </div>
      </div>
      {/* Bottom Actions */}
      <div className="atelier-card-footer pt-space-md flex flex-wrap items-center justify-between">
        <span className={p.footerNoteClass}>{p.footerNote}</span>
        <div className={p.linksWrapClass || 'flex items-center gap-space-sm'}>
          {p.links.map((link) =>
            link.plain ? (
              <a
                key={link.label}
                className="inline-flex items-center font-label-md text-label-md text-secondary"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-secondary transition-colors"
                href={link.href}
                target={isExternal(link.href) ? '_blank' : undefined}
                rel={isExternal(link.href) ? 'noopener noreferrer' : undefined}
              >
                <span>{link.label}</span>
                <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                  arrow_outward
                </span>
              </a>
            ),
          )}
        </div>
      </div>
    </motion.article>
  );
}
