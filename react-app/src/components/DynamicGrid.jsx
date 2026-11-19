import { useEffect, useRef } from 'react';

export default function DynamicGrid() {
  const grid = useRef(null);
  useEffect(() => {
    const node = grid.current, hero = node.closest('#home');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0, idle, x = .5, y = .45, strength = 0, tx = x, ty = y, ts = 0;
    const tick = () => {
      x += (tx-x)*.12; y += (ty-y)*.12; strength += (ts-strength)*.09;
      node.style.setProperty('--x', `${x*100}%`);
      node.style.setProperty('--y', `${y*100}%`);
      node.style.setProperty('--strength', strength.toFixed(3));
      frame = Math.abs(tx-x)+Math.abs(ty-y)+Math.abs(ts-strength) > .003 ? requestAnimationFrame(tick) : 0;
    };
    const run = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const reset = () => { ts = 0; run(); };
    const move = event => {
      if (reduced.matches || !fine.matches) return;
      const rect = node.getBoundingClientRect();
      tx = (event.clientX-rect.left)/rect.width; ty = (event.clientY-rect.top)/rect.height; ts = 1;
      clearTimeout(idle); idle = setTimeout(reset, 1800); run();
    };
    const changed = () => { if (reduced.matches || !fine.matches) reset(); };
    hero.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', changed); fine.addEventListener('change', changed);
    return () => { hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', reset); reduced.removeEventListener('change', changed); fine.removeEventListener('change', changed); clearTimeout(idle); cancelAnimationFrame(frame); };
  }, []);
  return <div ref={grid} className="dynamic-grid">
    <div className="dynamic-grid__ambient" /><div className="dynamic-grid__spot" /><div className="dynamic-grid__focus" />
    <svg className="dynamic-grid__trails" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1440 720">
      <path d="M0 192H1440 M240 0V720 M1008 0V720" /><path d="M0 432H1440 M480 0V720 M1248 0V720" />
    </svg>
  </div>;
}
