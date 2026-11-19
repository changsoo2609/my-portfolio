import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const scenes = [
  { code: '404', label: '문제 발견', at: 0, background: '#081230', accent: '#eac779' },
  { code: '500', label: '원인 분석', at: 740, background: '#1e223a', accent: '#efac8b' },
  { code: '503', label: '연결 복구', at: 1480, background: '#0c2934', accent: '#a7ddd3' },
  { code: '200', label: '연결 완료', at: 2220, background: '#123c35', accent: '#a8efbb' },
];
const duration = 3650;
const ease = [0.22, 1, 0.36, 1];
const digitShapes = [
  { y: '46%', scaleY: 1.64, skewX: -9, clipPath: 'inset(56% 0 0 0)' },
  { y: '-40%', scaleY: 0.3, skewX: 7, clipPath: 'inset(0 0 52% 0)' },
  { y: '36%', scaleY: 1.4, skewX: -8, clipPath: 'inset(44% 0 0 0)' },
];

export default function HeroIntro({ onFinish, onReveal }) {
  const dialogRef = useRef(null);
  const skipRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const scene = scenes[index];

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (typeof dialog.showModal !== 'function') {
      onFinish();
      return;
    }
    dialog.showModal();
    skipRef.current.focus();
    const timers = scenes.slice(1).map(({ at }, i) => setTimeout(() => setIndex(i + 1), at));
    timers.push(setTimeout(() => { setRevealing(true); onReveal(); }, 2990), setTimeout(onFinish, duration));
    return () => {
      timers.forEach(clearTimeout);
      if (dialog.open) dialog.close();
    };
  }, [onFinish, onReveal]);

  return (
    <dialog
      ref={dialogRef}
      className="hero-intro"
      aria-label="포트폴리오 인트로"
      onCancel={event => { event.preventDefault(); onFinish(); }}
    >
      <motion.div
        className="hero-intro__scene"
        style={{ '--intro-accent': scene.accent }}
        initial={false}
        animate={{
          backgroundColor: scene.background,
          opacity: revealing ? 0 : 1,
        }}
        transition={{ backgroundColor: { duration: 0.4 }, opacity: { duration: 0.64, ease } }}
      >
        <motion.div aria-hidden="true" className="hero-intro__blueprint"
          animate={{ rotate: [-10, 8, -5, 0][index], scale: [1.22, 0.86, 1.12, 1][index] }}
          transition={{ duration: 0.64, ease }}
        />
        <motion.div aria-hidden="true" className="hero-intro__trace"
          initial={{ scaleX: 0 }} animate={{ scaleX: [0, 0.26, 0.59, 1][index] }}
          transition={{ duration: 0.55, ease }}
        />
        <div className="hero-intro__name" aria-hidden="true">CHANGSOO HAN <span> / </span> PORTFOLIO</div>
        <div className="hero-intro__center">
          <div className="hero-intro__digits" aria-hidden="true" data-code={scene.code}>
            {scene.code.split('').map((digit, slot) => (
              <div className="hero-intro__slot" key={slot}>
                <AnimatePresence initial={false}>
                  <motion.span key={digit}
                    initial={{ ...digitShapes[slot], opacity: 0 }}
                    animate={{ y: 0, scaleY: 1, skewX: 0, clipPath: 'inset(0% 0 0% 0)', opacity: 1 }}
                    exit={{ ...digitShapes[(slot + 1) % 3], opacity: 0 }}
                    transition={{ duration: 0.51, delay: slot * 0.055, ease }}
                  >{digit}</motion.span>
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div className="hero-intro__caption" aria-hidden="true">
            <span>0{index + 1} / 04</span>
            <span>{scene.label}</span>
          </div>
        </div>
      </motion.div>
      <button ref={skipRef} type="button" className="hero-intro__skip" onClick={onFinish} style={{ opacity: revealing ? 0 : 1, transition: 'opacity .4s' }}>
        인트로 건너뛰기 <span aria-hidden="true">↗</span>
      </button>
    </dialog>
  );
}
