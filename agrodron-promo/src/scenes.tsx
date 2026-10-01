import React from 'react';
import {AbsoluteFill, interpolate, random} from 'remotion';
import {C, FONT, SCENES} from './theme';
import {Brackets, ClipLine, Counter, Drone, GridBg, Kicker, Mono, ease, springIn, sprayParticles, useF, useS} from './ui';

const Fill: React.FC<{bg?: string; children: React.ReactNode}> = ({bg = C.graphite, children}) => (
  <AbsoluteFill style={{background: bg, overflow: 'hidden'}}>{children}</AbsoluteFill>
);

/* ───────────── 1 · INTRO ───────────── */
export const Intro: React.FC = () => {
  const f = useF();
  const {s, w, h, vertical} = useS();
  const droneX = interpolate(f, [0, 90], [w * 1.05, vertical ? w * 0.66 : w * 0.72], {extrapolateRight: 'clamp', easing: (t) => 1 - Math.pow(1 - t, 3)});
  const droneY = (vertical ? h * 0.2 : h * 0.3) + Math.sin(f / 9) * 10 * s;
  const head = (vertical ? 128 : 132) * s;
  return (
    <Fill>
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 70% 30%, ${C.forest} 0%, ${C.graphite} 65%)`}} />
      <GridBg />
      <Brackets />
      <div style={{position: 'absolute', left: droneX - 220 * s, top: droneY - 140 * s}}>
        <Drone size={440 * s} spraying tilt={-6} />
        {sprayParticles(f, 'intro', 40, 160, 520, s).map((p) => (
          <div key={p.k} style={{position: 'absolute', left: 220 * s + p.x, top: 280 * s + p.y, width: p.r, height: p.r, borderRadius: '50%', background: C.hi, opacity: p.o * ease(f, 30, 50)}} />
        ))}
      </div>
      <div style={{position: 'absolute', left: (vertical ? 80 : 150) * s, right: 60 * s, top: vertical ? h * 0.42 : h * 0.3}}>
        <Kicker s={s} delay={4}>drones agrícolas · la palma</Kicker>
        <div style={{height: 30 * s}} />
        <ClipLine size={head} delay={10}>Precisión aérea</ClipLine>
        <ClipLine size={head} delay={18}>para la</ClipLine>
        <ClipLine size={head} delay={26} color={C.signal}>tierra canaria.</ClipLine>
        <div style={{height: 40 * s}} />
        <div style={{opacity: ease(f, 44, 64), transform: `translateY(${ease(f, 44, 64, 20, 0)}px)`, fontFamily: FONT.body, fontSize: 34 * s, lineHeight: 1.45, color: 'rgba(237,237,232,0.7)', maxWidth: 800 * s}}>
          Tratamientos y cartografía multiespectral con drones DJI profesionales.
        </div>
      </div>
      <Mono s={s} size={20} style={{position: 'absolute', top: 100 * s, left: 100 * s, opacity: ease(f, 20, 40)}}>28.68°N · 17.76°W</Mono>
    </Fill>
  );
};

/* ───────────── 2 · NDVI ───────────── */
const ndviColor = (v: number) => {
  // red → amber → signal green
  const stops: [number, [number, number, number]][] = [[0, [229, 72, 77]], [0.45, [245, 166, 35]], [0.75, [198, 242, 78]], [1, [90, 200, 120]]];
  for (let i = 1; i < stops.length; i++) {
    if (v <= stops[i][0]) {
      const [a, ca] = stops[i - 1];
      const [b, cb] = stops[i];
      const t = (v - a) / (b - a);
      return `rgb(${ca.map((c, k) => Math.round(c + (cb[k] - c) * t)).join(',')})`;
    }
  }
  return 'rgb(90,200,120)';
};

export const Ndvi: React.FC = () => {
  const f = useF();
  const {s, w, h, vertical} = useS();
  const N = 12;
  const mapSize = (vertical ? 800 : 760) * s;
  const cell = mapSize / N;
  const scan = ease(f, 22, 100, 0, 1);
  const steps = [
    ['01', 'Observar', 'Vuelo programado con DJI Mavic 3M'],
    ['02', 'Detectar', 'Índices NDVI y mapas de salud'],
    ['03', 'Actuar', 'Tratamos solo donde el mapa lo indica'],
  ];
  const title = (vertical ? 112 : 118) * s;
  return (
    <Fill bg={C.paper}>
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: vertical ? 'column' : 'row', padding: `${(vertical ? 110 : 90) * s}px ${(vertical ? 70 : 110) * s}px`, gap: 50 * s, alignItems: vertical ? 'flex-start' : 'center', justifyContent: 'center'}}>
        <div style={{flex: vertical ? '0 0 auto' : 1}}>
          <Kicker s={s} color={C.teal}>tecnología multiespectral</Kicker>
          <div style={{height: 24 * s}} />
          <ClipLine size={title} color={C.graphite} delay={4}>Lo que el ojo</ClipLine>
          <ClipLine size={title} color={C.teal} delay={12}>no ve.</ClipLine>
          <div style={{height: 36 * s}} />
          {steps.map(([n, t, d], i) => {
            const e = ease(f, 70 + i * 14, 90 + i * 14);
            return (
              <div key={n} style={{display: 'flex', gap: 28 * s, padding: `${16 * s}px 0`, borderTop: `2px solid rgba(26,28,27,0.1)`, opacity: e, transform: `translateX(${(1 - e) * -40}px)`}}>
                <Mono s={s} size={22} color={C.teal} style={{marginTop: 10 * s}}>{n}</Mono>
                <div>
                  <div style={{fontFamily: FONT.head, fontWeight: 500, fontSize: 44 * s, color: C.graphite}}>{t}</div>
                  <div style={{fontFamily: FONT.body, fontSize: 26 * s, color: 'rgba(26,28,27,0.6)', marginTop: 4 * s}}>{d}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{position: 'relative', width: mapSize, height: mapSize, background: C.graphite, borderRadius: 4, overflow: 'hidden', flex: '0 0 auto', alignSelf: 'center', opacity: ease(f, 8, 24), transform: `translateY(${ease(f, 8, 30, 60, 0)}px)`}}>
          <GridBg opacity={0.06} size={40} />
          {Array.from({length: N * N}, (_, i) => {
            const cx = i % N, cy = Math.floor(i / N);
            const base = 0.55 + 0.35 * Math.sin(cx * 0.7 + cy * 0.45) * Math.cos(cy * 0.6 - cx * 0.2);
            const stress = Math.max(0, 1 - Math.hypot(cx - 8, cy - 4) / 2.6); // stressed zone
            const v = Math.min(1, Math.max(0, base + 0.15 * (random('n' + i) - 0.5) - stress * 0.7));
            const reveal = cy / N < scan ? 1 : 0;
            const pulse = stress > 0.3 && f > 100 ? 0.6 + 0.4 * Math.sin(f / 4) : 1;
            return (
              <div key={i} style={{position: 'absolute', left: cx * cell + 2, top: cy * cell + 2, width: cell - 4, height: cell - 4, borderRadius: 3, background: ndviColor(v), opacity: reveal * 0.88 * pulse, transform: `scale(${reveal ? 1 : 0.4})`}} />
            );
          })}
          <div style={{position: 'absolute', left: 0, right: 0, top: scan * mapSize, height: 3 * s, background: C.signal, boxShadow: `0 0 ${24 * s}px ${C.signal}`, opacity: scan < 1 ? 1 : 0}} />
          <Mono s={s} size={18} style={{position: 'absolute', top: 18 * s, left: 22 * s}}>// vega norte</Mono>
          <Mono s={s} size={18} style={{position: 'absolute', top: 18 * s, right: 22 * s}}>NDVI · 14.7 ha</Mono>
          {f > 100 && (
            <div style={{position: 'absolute', left: 8.1 * cell, top: 4.5 * cell, border: `2px solid ${C.signal}`, borderRadius: 4, padding: `${6 * s}px ${12 * s}px`, background: 'rgba(20,22,21,0.85)', transform: `scale(${springIn(f, 100)})`, transformOrigin: 'left top'}}>
              <Mono s={s} size={18}>estrés hídrico</Mono>
            </div>
          )}
          <div style={{position: 'absolute', left: 22 * s, bottom: 20 * s, background: C.signal, color: C.graphite, fontFamily: FONT.mono, fontWeight: 700, fontSize: 22 * s, letterSpacing: '0.15em', padding: `${8 * s}px ${14 * s}px`, textTransform: 'uppercase'}}>NDVI 0.82</div>
        </div>
      </div>
    </Fill>
  );
};

/* ───────────── 3 · SPRAY ───────────── */
export const Spray: React.FC = () => {
  const f = useF();
  const {s, w, h, vertical} = useS();
  const rows = 6;
  const top = h * (vertical ? 0.36 : 0.3);
  const bandH = (h - top) / rows;
  const pass = (r: number) => ease(f, 20 + r * 16, 20 + r * 16 + 22, 0, 1);
  const cur = Math.min(rows - 1, Math.max(0, Math.floor((f - 20) / 16)));
  const dir = cur % 2 === 0 ? 1 : -1;
  const within = ease(f, 20 + cur * 16, 36 + cur * 16);
  const droneX = (dir === 1 ? within : 1 - within) * (w + 200 * s) - 100 * s;
  const droneY = top + cur * bandH - 70 * s;
  const done = f > 20 + rows * 16;
  const big = (vertical ? 250 : 230) * s;
  return (
    <Fill bg={C.deep}>
      <GridBg opacity={0.05} />
      {/* terraces */}
      <svg width={w} height={h} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: rows}, (_, r) => {
          const y0 = top + r * bandH;
          const treated = pass(r);
          return (
            <g key={r}>
              <path d={`M0 ${y0 + bandH} Q ${w * 0.5} ${y0 + bandH - 30 * s - r * 6 * s} ${w} ${y0 + bandH}  L ${w} ${h} L 0 ${h} Z`} fill={r % 2 ? '#0d3a33' : '#12453c'} opacity={0.9} />
              <rect x={0} y={y0 + bandH * 0.45} width={w * treated} height={bandH * 0.4} fill={C.signal} opacity={0.18} />
              {Array.from({length: 22}, (_, k) => (
                <circle key={k} cx={(k + 0.5) * (w / 22)} cy={y0 + bandH * 0.65} r={9 * s} fill={treated * w > (k + 0.5) * (w / 22) ? C.signal : '#2c6b5c'} opacity={0.85} />
              ))}
            </g>
          );
        })}
      </svg>
      {/* drone + spray */}
      {!done && f > 18 && (
        <div style={{position: 'absolute', left: droneX - 170 * s, top: droneY - 100 * s}}>
          <Drone size={340 * s} spraying tilt={dir * 4} />
          {sprayParticles(f, 's' + cur, 34, 140, bandH * 0.9, s).map((p) => (
            <div key={p.k} style={{position: 'absolute', left: 170 * s + p.x, top: 210 * s + p.y, width: p.r, height: p.r, borderRadius: '50%', background: C.hi, opacity: p.o}} />
          ))}
        </div>
      )}
      <div style={{position: 'absolute', left: (vertical ? 70 : 110) * s, top: (vertical ? 120 : 80) * s, right: 60 * s}}>
        <Kicker s={s} delay={2}>tratamiento dirigido</Kicker>
        <div style={{height: 20 * s}} />
        <div style={{display: 'flex', alignItems: 'baseline', gap: 26 * s, flexWrap: 'wrap'}}>
          <div style={{fontFamily: FONT.head, fontWeight: 500, fontSize: big, lineHeight: 0.95, color: C.signal, letterSpacing: '-0.04em', opacity: ease(f, 8, 20)}}>
            <Counter to={30} start={10} dur={50} prefix="−" suffix="%" />
          </div>
        </div>
        <div style={{fontFamily: FONT.body, fontSize: 36 * s, color: 'rgba(237,237,232,0.85)', marginTop: 12 * s, maxWidth: 760 * s, lineHeight: 1.3, opacity: ease(f, 24, 44)}}>
          menos producto fitosanitario aplicando solo donde el mapa lo indica.
        </div>
      </div>
      <Mono s={s} size={20} color="rgba(237,237,232,0.6)" style={{position: 'absolute', right: 70 * s, bottom: 56 * s, opacity: ease(f, 20, 40)}}>DJI Agras T50 · RTK</Mono>
    </Fill>
  );
};

/* ───────────── 4 · CULTIVOS ───────────── */
export const Crops: React.FC = () => {
  const f = useF();
  const {s, w, h, vertical} = useS();
  const words = ['Plátano', 'Viña', 'Aguacate', 'Mango', 'Papa', 'Lechuga', 'Protea'];
  const per = 13;
  const idx = Math.min(words.length - 1, Math.max(0, Math.floor((f - 26) / per)));
  const local = f - 26 - idx * per;
  const y = ease(local, 0, 9, 110, 0);
  const wordSize = (vertical ? 210 : 230) * s;
  return (
    <Fill>
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(160deg, ${C.deep}, ${C.graphite})`}} />
      <GridBg />
      <Brackets />
      <div style={{position: 'absolute', left: (vertical ? 90 : 150) * s, top: (vertical ? 190 : 120) * s, right: 90 * s}}>
        <Kicker s={s} delay={2}>especialización · cultivos</Kicker>
        <div style={{height: 28 * s}} />
        <ClipLine size={(vertical ? 76 : 84) * s} delay={6}>Terrazas volcánicas,</ClipLine>
        <ClipLine size={(vertical ? 76 : 84) * s} delay={14} color={C.signal}>pendientes imposibles.</ClipLine>
      </div>
      <div style={{position: 'absolute', left: (vertical ? 90 : 150) * s, right: 60 * s, top: '52%', height: wordSize * 1.45, paddingBottom: wordSize * 0.1, overflow: 'hidden', display: 'flex', alignItems: 'center'}}>
        {f >= 26 && (
          <div style={{transform: `translateY(${y}%)`, fontFamily: FONT.head, fontWeight: 700, fontSize: wordSize, letterSpacing: '-0.04em', color: idx < 3 ? C.hi : C.signal}}>
            {words[idx]}<span style={{color: C.signal}}>.</span>
          </div>
        )}
      </div>
      <div style={{position: 'absolute', left: (vertical ? 90 : 150) * s, bottom: (vertical ? 190 : 110) * s, display: 'flex', gap: 14 * s, flexWrap: 'wrap', right: 90 * s}}>
        {words.map((wd, i) => (
          <div key={wd} style={{fontFamily: FONT.mono, fontSize: 22 * s, letterSpacing: '0.18em', textTransform: 'uppercase', padding: `${10 * s}px ${20 * s}px`, borderRadius: 999, border: `2px solid ${i === idx && f >= 26 ? C.signal : 'rgba(237,237,232,0.25)'}`, color: i === idx && f >= 26 ? C.signal : 'rgba(237,237,232,0.8)', opacity: ease(f, 20 + i * 3, 32 + i * 3)}}>
            {wd}
          </div>
        ))}
      </div>
    </Fill>
  );
};

/* ───────────── 5 · STATS ───────────── */
export const Stats: React.FC = () => {
  const f = useF();
  const {s, vertical} = useS();
  const stats: {v: React.ReactNode; l: string}[] = [
    {v: <Counter to={11} start={10} dur={40} />, l: 'años pilotando drones profesionales'},
    {v: <Counter to={30} start={14} dur={40} prefix="−" suffix="%" />, l: 'menos producto fitosanitario'},
    {v: 'AESA', l: 'piloto certificado · operador UAS'},
    {v: 'RTK', l: 'precisión centimétrica en cada vuelo'},
  ];
  const size = (vertical ? 150 : 140) * s;
  return (
    <Fill bg={C.deep}>
      <GridBg opacity={0.05} />
      <div style={{position: 'absolute', left: (vertical ? 80 : 130) * s, right: 80 * s, top: (vertical ? 150 : 90) * s}}>
        <Kicker s={s}>lecturas · en el campo</Kicker>
        <div style={{height: 24 * s}} />
        <ClipLine size={(vertical ? 88 : 90) * s} delay={4}>Experiencia que se</ClipLine>
        <ClipLine size={(vertical ? 88 : 90) * s} delay={12} color={C.signal}>nota en el campo.</ClipLine>
      </div>
      <div style={{position: 'absolute', left: (vertical ? 80 : 130) * s, right: 80 * s, top: vertical ? 620 * s : 420 * s, display: 'grid', gridTemplateColumns: vertical ? '1fr 1fr' : 'repeat(4, 1fr)', gap: `${60 * s}px ${50 * s}px`}}>
        {stats.map((st, i) => {
          const e = springIn(f, 18 + i * 8);
          return (
            <div key={i} style={{position: 'relative', paddingTop: 28 * s, opacity: Math.min(1, e), transform: `translateY(${(1 - e) * 50}px)`}}>
              <div style={{position: 'absolute', top: 0, left: 0, height: 2, background: C.signal, width: `${ease(f, 18 + i * 8, 50 + i * 8) * 100}%`}} />
              <Mono s={s} size={20} color="rgba(198,242,78,0.8)">0{i + 1}</Mono>
              <div style={{fontFamily: FONT.head, fontWeight: 500, fontSize: size, lineHeight: 1, color: C.signal, letterSpacing: '-0.04em', marginTop: 12 * s}}>{st.v}</div>
              <div style={{fontFamily: FONT.body, fontSize: 28 * s, color: C.mid, marginTop: 18 * s, lineHeight: 1.35, maxWidth: 420 * s}}>{st.l}</div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: (vertical ? 80 : 130) * s, right: 80 * s, bottom: 70 * s, borderTop: '1px solid rgba(198,242,78,0.2)', paddingTop: 24 * s, display: 'flex', gap: `${14 * s}px ${34 * s}px`, flexWrap: 'wrap', opacity: ease(f, 70, 90)}}>
        {['DJI Agras T50', 'Mavic 3 multiespectral', 'Distribuidor DJI Enterprise', 'Toda Canarias'].map((t) => (
          <Mono key={t} s={s} size={18} color={C.mid}>• {t}</Mono>
        ))}
      </div>
    </Fill>
  );
};

/* ───────────── 6 · CTA ───────────── */
export const Cta: React.FC = () => {
  const f = useF();
  const {s, w, h, vertical} = useS();
  const head = (vertical ? 150 : 150) * s;
  const pulse = 1 + 0.03 * Math.sin(f / 5);
  const sunset = `linear-gradient(180deg, ${C.graphite} 0%, ${C.teal} 62%, ${C.graphite} 100%)`;
  return (
    <Fill>
      <div style={{position: 'absolute', inset: 0, background: sunset, opacity: 0.95}} />
      <GridBg opacity={0.06} />
      <Brackets inset={56} />
      <div style={{position: 'absolute', left: 0, right: 0, top: vertical ? h * 0.2 : h * 0.12, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
        <Kicker s={s}>vuelo · siguiente</Kicker>
        <div style={{height: 30 * s}} />
        <ClipLine size={head} delay={4}>¿Listo para</ClipLine>
        <ClipLine size={head} delay={12} color={C.signal}>despegar?</ClipLine>
        <div style={{fontFamily: FONT.body, fontSize: 34 * s, color: 'rgba(237,237,232,0.8)', maxWidth: 820 * s, lineHeight: 1.4, marginTop: 36 * s, opacity: ease(f, 30, 50)}}>
          Estudio de tu finca sin compromiso. Hablamos, volamos y te enseñamos qué puede mejorar.
        </div>
        <div style={{marginTop: 54 * s, background: C.signal, color: C.graphite, fontFamily: FONT.mono, fontWeight: 700, fontSize: 28 * s, letterSpacing: '0.2em', textTransform: 'uppercase', padding: `${28 * s}px ${48 * s}px`, borderRadius: 4, transform: `scale(${Math.min(1, springIn(f, 44)) * pulse})`, opacity: ease(f, 44, 56)}}>
          Solicitar presupuesto →
        </div>
        <div style={{marginTop: 44 * s, fontFamily: FONT.head, fontWeight: 500, fontSize: 64 * s, color: C.hi, opacity: ease(f, 62, 80)}}>658 085 504</div>
        <Mono s={s} size={24} color="rgba(237,237,232,0.7)" style={{marginTop: 18 * s, opacity: ease(f, 68, 88)}}>agrodroncanarias.es</Mono>
      </div>
      <div style={{position: 'absolute', left: ease(f, 0, 110, -300, w + 300) , bottom: (vertical ? 150 : 90) * s, opacity: 0.9}}>
        <Drone size={260 * s} tilt={6} />
      </div>
    </Fill>
  );
};
