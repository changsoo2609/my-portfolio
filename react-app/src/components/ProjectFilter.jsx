import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';
import { FILTERS } from '../data/projects.js';

const SELECTED_CLASS =
  'px-space-md py-space-xs rounded-lg font-label-sm text-label-sm bg-primary text-on-primary font-bold shadow-sm transition-all';
const IDLE_CLASS =
  'px-space-md py-space-xs rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all';

// Arcana Switcher Filter Tabs — Astryx SegmentedControl이 단일 선택 semantics와
// 키보드 조작을 맡고, 시각 클래스는 기존 디자인 토큰으로 덮어쓴다.
export default function ProjectFilter({ value, onChange }) {
  return (
    <SegmentedControl
      id="arcana-filter"
      label="프로젝트 필터"
      value={value}
      onChange={onChange}
      className="flex flex-wrap gap-space-xs mt-space-md md:mt-0 p-1.5 bg-surface-container-lowest rounded-xl shadow-sm"
    >
      {FILTERS.map((filter) => (
        <SegmentedControlItem
          key={filter.value}
          value={filter.value}
          label={filter.label}
          className={value === filter.value ? SELECTED_CLASS : IDLE_CLASS}
        />
      ))}
    </SegmentedControl>
  );
}
