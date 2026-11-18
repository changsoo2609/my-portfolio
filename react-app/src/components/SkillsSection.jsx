import { motion, useReducedMotion } from 'motion/react';

const PILLARS = [
  {
    icon: 'palette',
    tag: 'PILLAR 01',
    title: 'Frontend Engineering',
    description: '역할별 사용자 화면과 상태 관리, 화면 크기에 맞는 레이아웃 구현.',
    items: [
      'HTML · CSS · JavaScript',
      'React · TypeScript',
      '역할별 UI 및 상태 관리',
      'Responsive Web Design',
    ],
    footer: '구현: 해빛 · 팀 스택: GenMark AI',
  },
  {
    icon: 'dns',
    tag: 'PILLAR 02',
    title: 'Backend Architecture',
    description:
      '비동기 I/O를 활용한 고성능 API 서버 구축과 객체지향 기반의 확장성 높은 비즈니스 로직 모듈화.',
    items: ['Spring Boot (Java)', 'FastAPI · Python', 'RESTful API Design', '접근 권한 · 전달 API'],
    footer: 'PRODUCED IN: 밭머리, GenMark',
  },
  {
    icon: 'database',
    tag: 'PILLAR 03',
    title: 'Data Architecture',
    description: '프로젝트 목적에 맞춰 작업 데이터·버전·로컬 복습 상태를 저장하고 조회합니다.',
    items: ['MariaDB', 'Supabase · PostgreSQL', 'SQLite 검색·복습 상태', '작업 버전 및 상태 관리'],
    footer: 'PRODUCED IN: 밭머리, GenMark',
  },
  {
    icon: 'fact_check',
    tag: 'PILLAR 04',
    title: 'Testing & Reliability',
    description: '단위 테스트와 API 계약을 통해 주요 흐름과 예외를 확인하는 방법을 다룹니다.',
    items: ['PyTest Test Automation', 'Mocking & Fixture Setup', '예외 흐름과 테스트 범위', 'API 계약 검토'],
    footer: 'REFERENCES: 밭머리 API 테스트 문서',
  },
];

// SECTION III: CONSTELLATION SPECTRUM (개발 역량 및 기술 스펙트럼)
export default function SkillsSection() {
  const reduced = useReducedMotion();
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
  return (
    <section id="skills" className="scroll-mt-20 w-full bg-surface-container-low/70 py-24">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-space-xl">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-space-xs">
            04. ENGINEERING SPECTRUM
          </span>
          <h2
            className="atelier-section-title font-headline-lg text-headline-lg text-primary"
            style={{ letterSpacing: '-0.025em', lineHeight: 1.3 }}
          >
            4대 축으로 구축된 엔지니어링 기술 스펙트럼
          </h2>
          <p
            className="font-body-md text-body-md text-on-surface-variant mt-space-xs"
            style={{ letterSpacing: '-0.012em', lineHeight: 1.75, wordBreak: 'keep-all' }}
          >
            AI API와 OCR, 웹 화면, 백엔드와 데이터베이스를 연결하고 기능을 검증한 경험입니다.
          </p>
        </div>
        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {PILLARS.map((pillar, index) => (
            <motion.div
              initial={reduced ? false : { opacity: 0.55, y: mobile ? 24 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: reduced ? 0 : index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={pillar.tag}
              className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                    {pillar.icon}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
                  {pillar.tag}
                </span>
                <h3 className="font-title-lg text-title-lg text-primary mt-1 mb-space-sm">{pillar.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                  {pillar.description}
                </p>
                <div className="flex flex-col gap-1.5 font-body-sm text-body-sm text-on-surface">
                  {pillar.items.map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <span className="text-secondary">✦</span> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-space-md mt-space-md">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                  {pillar.footer}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
