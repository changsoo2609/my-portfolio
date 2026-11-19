import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import ProjectFilter from './ProjectFilter.jsx';
import ProjectCard from './ProjectCard.jsx';
import { projects, FILTERS } from '../data/projects.js';

// SECTION I: MAJOR ARCANA PLATES (4 Selected Engineering Constellations)
export default function ProjectSection({ projectFilterScrollRef }) {
  const [filter, setFilter] = useState('all');
  const reduced = useReducedMotion();
  const filterTopRef = useRef(null);

  const handleFilter = (value) => {
    const bar = document.getElementById('arcana-filter');
    if (bar) filterTopRef.current = bar.getBoundingClientRect().top;
    setFilter(value);
  };

  // 필터로 목록 높이가 바뀌면 필터가 원래 위치에 머물도록 스크롤을 보정한다 (기존 스크립트 로직 이식)
  useEffect(() => {
    if (filterTopRef.current === null) return;
    const bar = document.getElementById('arcana-filter');
    const offset = bar.getBoundingClientRect().top - filterTopRef.current;
    if (Math.abs(offset) > 0.5) window.scrollBy({ top: offset, behavior: 'instant' });
    filterTopRef.current = null;
    projectFilterScrollRef.current = window.scrollY;
  }, [filter, projectFilterScrollRef]);

  const selectedLabel = FILTERS.find((f) => f.value === filter)?.label ?? '';
  const status =
    filter === 'all' ? '전체 프로젝트 4개 표시' : `${selectedLabel} 프로젝트 표시`;
  const visibleProjects = projects.filter(
    (project) => filter === 'all' || filter === project.key,
  );

  return (
    <section className="w-full bg-surface-container-low/60 py-24 scroll-mt-20" id="major-arcana-plates">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-space-xs">
              02. SELECTED PROJECTS // 핵심 프로젝트 및 검증 내역
            </span>
            <h2 className="atelier-section-title font-headline-lg text-headline-lg text-primary">
              현장 문제를 풀어낸 대표 프로젝트 4선
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
              프로젝트마다 해결한 문제, 맡은 일, 확인할 수 있는 자료를 정리했습니다.
            </p>
          </div>
          <ProjectFilter value={filter} onChange={handleFilter} />
        </div>
        <p id="project-status" className="sr-only" role="status">
          {status}
        </p>
        {/* Constellation Deck Grid — 카드 유지 렌더 + layout 애니메이션으로
            추가·제거·재배치를 연결한다 (기존 전체 리마운트 방식 폐기). */}
        <motion.div
          layout={!reduced}
          transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
          className={`grid grid-cols-1 gap-space-lg ${filter === 'all' ? 'lg:grid-cols-2' : ''}`}
          id="arcana-grid"
        >
          <AnimatePresence initial={false} mode={reduced ? undefined : 'popLayout'}>
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.key} index={index} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
