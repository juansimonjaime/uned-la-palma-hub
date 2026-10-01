import React from 'react';
import {interpolate, random, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, FONT, FPS} from './theme';

export const SpeedCtx = React.createContext(1);
/** scene-local frame, scaled by the scene's speed factor */
export const useF = () => useCurrentFrame() * React.useContext(SpeedCtx);

export const useS = () => {
  const {width, height} = useVideoConfig();
  return {w: width, h: height, vertical: height > width, s: Math.min(width, height) / 1080};
};

export const EASE = Easing.bezier(0.22, 1, 0.36, 1);

export const ease = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE});

/** Line that slides up from a clipped mask (as in the site's ClipLine) */
export const ClipLine: React.FC<{children: React.ReactNode; delay?: number; color?: string; size: number; weight?: number}> = ({
  children, delay = 0, color = C.hi, size, weight = 500,
}) => {
  const f = useF();
  const y = ease(f, delay, delay + 26, 115, 0);
  return (
    <div style={{overflow: 'hidden', paddingBottom: size * 0.12, lineHeight: 1.0}}>
      <div style={{transform: `translateY(${y}%)`, fontFamily: FONT.head, fontWeight: weight, fontSize: size, color, letterSpacing: '-0.03em'}}>
        {children}
      </div>
    </div>
  );
};

export const Kicker: React.FC<{children: React.ReactNode; delay?: number; color?: string; s: number}> = ({children, delay = 0, color = C.signal, s}) => {
  const f = useF();
  return (
    <div style={{overflow: 'hidden'}}>
      <div style={{
        transform: `translateY(${ease(f, delay, delay + 20, 120, 0)}%)`,
        fontFamily: FONT.mono, fontWeight: 500, fontSize: 24 * s, letterSpacing: '0.18em', textTransform: 'uppercase', color,
      }}>
        <span style={{opacity: 0.7}}>{'// '}</span>{children}
      </div>
    </div>
  );
};

export const GridBg: React.FC<{opacity?: number; size?: number; drift?: boolean}> = ({opacity = 0.07, size = 48, drift = true}) => {
  const f = useF();
  const {s} = useS();
  const px = size * s;
  const off = drift ? (f * 0.6) % px : 0;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `linear-gradient(to right, rgba(255,255,255,${opacity}) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
      backgroundSize: `${px}px ${px}px`, backgroundPosition: `${off}px ${off}px`,
    }} />
  );
};

export const Brackets: React.FC<{inset?: number; delay?: number}> = ({inset = 48, delay = 0}) => {
  const f = useF();
  const {s} = useS();
  const o = ease(f, delay, delay + 12);
  const k = 44 * s;
  const st = (p: React.CSSProperties): React.CSSProperties => ({position: 'absolute', width: k, height: k, border: `2px solid ${C.signal}`, opacity: o, ...p});
  const i = inset * s;
  return (
    <>
      <div style={st({top: i, left: i, borderRight: 0, borderBottom: 0})} />
      <div style={st({top: i, right: i, borderLeft: 0, borderBottom: 0})} />
      <div style={st({bottom: i, left: i, borderRight: 0, borderTop: 0})} />
      <div style={st({bottom: i, right: i, borderLeft: 0, borderTop: 0})} />
    </>
  );
};

export const Mono: React.FC<{children: React.ReactNode; s: number; size?: number; color?: string; style?: React.CSSProperties}> = ({children, s, size = 22, color = C.signal, style}) => (
  <div style={{fontFamily: FONT.mono, fontSize: size * s, letterSpacing: '0.2em', textTransform: 'uppercase', color, fontWeight: 500, ...style}}>{children}</div>
);

export const Drone: React.FC<{size: number; spraying?: boolean; tilt?: number}> = ({size, spraying, tilt = 0}) => {
  const f = useF();
  const spin = (i: number) => ({
    transform: `scaleX(${0.55 + 0.45 * Math.abs(Math.sin(f * 1.9 + i))})`,
    transformOrigin: 'center', transformBox: 'fill-box' as const,
  });
  const arms: [number, number][] = [[-150, -52], [150, -52], [-110, 8], [110, 8]];
  return (
    <svg width={size} height={size * 0.62} viewBox="-200 -100 400 250" style={{overflow: 'visible', transform: `rotate(${tilt}deg)`}}>
      {/* arms */}
      {arms.map(([x, y], i) => (
        <line key={i} x1={0} y1={-10} x2={x} y2={y} stroke="#2a2f2d" strokeWidth={9} strokeLinecap="round" />
      ))}
      {/* rotors */}
      {arms.map(([x, y], i) => (
        <g key={'r' + i}>
          <ellipse cx={x} cy={y - 6} rx={62} ry={6} fill="rgba(237,237,232,0.28)" style={spin(i)} />
          <ellipse cx={x} cy={y - 6} rx={34} ry={3} fill="rgba(237,237,232,0.5)" style={spin(i + 2)} />
          <circle cx={x} cy={y - 6} r={7} fill="#1b1f1d" stroke={C.signal} strokeWidth={2} />
        </g>
      ))}
      {/* tank */}
      <path d="M -62 -18 L 62 -18 L 50 52 Q 0 66 -50 52 Z" fill="#e9ebe6" />
      <path d="M -62 -18 L 62 -18 L 58 4 L -58 4 Z" fill={C.signal} opacity={0.9} />
      {/* body */}
      <rect x={-34} y={-34} width={68} height={26} rx={10} fill="#1b1f1d" stroke="#3b423f" strokeWidth={2} />
      <circle cx={0} cy={-21} r={5} fill={C.signal} opacity={0.5 + 0.5 * Math.sin(f / 4)} />
      {/* nozzles */}
      {spraying && [-104, 104].map((x) => <rect key={x} x={x - 4} y={58} width={8} height={10} rx={2} fill="#2a2f2d" />)}
      {/* legs */}
      <line x1={-34} y1={50} x2={-48} y2={86} stroke="#2a2f2d" strokeWidth={6} strokeLinecap="round" />
      <line x1={34} y1={50} x2={48} y2={86} stroke="#2a2f2d" strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
};

export const sprayParticles = (f: number, seed: string, count: number, spread: number, length: number, s: number) =>
  Array.from({length: count}, (_, i) => {
    const life = 22;
    const t = ((f + Math.floor(random(seed + 'o' + i) * life)) % life) / life;
    const dx = (random(seed + 'x' + i) - 0.5) * spread * t;
    return {x: dx * s, y: t * length * s, o: (1 - t) * 0.75, r: (2 + random(seed + 'r' + i) * 4) * s * (0.6 + t), k: i};
  });

export const Counter: React.FC<{to: number; start: number; dur?: number; prefix?: string; suffix?: string}> = ({to, start, dur = 40, prefix = '', suffix = ''}) => {
  const f = useF();
  const v = Math.round(ease(f, start, start + dur, 0, to));
  return <>{prefix}{v}{suffix}</>;
};

export const springIn = (f: number, delay = 0, damping = 14) =>
  spring({frame: f - delay, fps: FPS, config: {damping, mass: 0.7}});
