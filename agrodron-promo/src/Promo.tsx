import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, SCENES, SPEED} from './theme';
import {Crops, Cta, Intro, Ndvi, Spray, Stats} from './scenes';
import {SpeedCtx, ease, useS} from './ui';

const Wipe: React.FC = () => {
  const f = useCurrentFrame();
  const {w} = useS();
  const x = ease(f, 0, 14, -w, w * 1.1);
  return <div style={{position: 'absolute', top: 0, bottom: 0, width: w * 0.5, left: x, background: `linear-gradient(90deg, transparent, ${C.signal}, transparent)`, opacity: f < 15 ? 0.85 : 0, mixBlendMode: 'screen'}} />;
};

const Scene: React.FC<{k: number; children: React.ReactNode}> = ({k, children}) => (
  <SpeedCtx.Provider value={k}><AbsoluteFill>{children}<Wipe /></AbsoluteFill></SpeedCtx.Provider>
);

const Chrome: React.FC = () => {
  const f = useCurrentFrame();
  const {s, w} = useS();
  const {durationInFrames} = useVideoConfig();
  return (
    <>
      <div style={{position: 'absolute', left: 0, bottom: 0, height: 6 * s, width: `${(f / durationInFrames) * 100}%`, background: C.signal}} />
      <div style={{position: 'absolute', top: 58 * s, right: 130 * s, fontFamily: FONT.mono, fontWeight: 700, fontSize: 20 * s, letterSpacing: '0.24em', color: C.signal, mixBlendMode: 'difference'}}>AGRODRON · CANARIAS</div>
    </>
  );
};

export const Promo: React.FC = () => {
  let t = 0;
  const seq = (d: number, k: number, el: React.ReactNode) => {
    const from = t;
    t += d;
    return <Sequence from={from} durationInFrames={d} key={from}><Scene k={k}>{el}</Scene></Sequence>;
  };
  return (
    <AbsoluteFill style={{background: C.graphite}}>
      {seq(SCENES.intro, SPEED.intro, <Intro />)}
      {seq(SCENES.ndvi, SPEED.ndvi, <Ndvi />)}
      {seq(SCENES.spray, SPEED.spray, <Spray />)}
      {seq(SCENES.crops, SPEED.crops, <Crops />)}
      {seq(SCENES.stats, SPEED.stats, <Stats />)}
      {seq(SCENES.cta, SPEED.cta, <Cta />)}
      <Chrome />
      <Audio src={staticFile('music.wav')} volume={0.8} />
    </AbsoluteFill>
  );
};
