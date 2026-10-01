export const C = {
  graphite: '#141615',
  deep: '#0E1F1A',
  paper: '#FAFAF7',
  teal: '#0E5A54',
  forest: '#123C36',
  signal: '#C6F24E',
  hi: '#EDEDE8',
  mid: '#B9BEBA',
};
export const FPS = 30;
export const SCENES = {intro: 60, ndvi: 90, spray: 90, crops: 75, stats: 60, cta: 75};
// speed factor = original scene length / new length (scene animations were authored for longer scenes)
export const SPEED = {intro: 1.5, ndvi: 1.67, spray: 2, crops: 1.6, stats: 2, cta: 1.6};
export const TOTAL = Object.values(SCENES).reduce((a, b) => a + b, 0); // 450 = 15s
export const FONT = {
  head: "'Space Grotesk', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};
