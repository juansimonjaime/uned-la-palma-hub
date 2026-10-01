import {continueRender, delayRender, staticFile} from 'remotion';

const faces: [string, number, string][] = [
  ['Space Grotesk', 500, 'space-grotesk-latin-500-normal.woff2'],
  ['Space Grotesk', 700, 'space-grotesk-latin-700-normal.woff2'],
  ['JetBrains Mono', 500, 'jetbrains-mono-latin-500-normal.woff2'],
  ['JetBrains Mono', 700, 'jetbrains-mono-latin-700-normal.woff2'],
  ['Inter', 400, 'inter-latin-400-normal.woff2'],
  ['Inter', 500, 'inter-latin-500-normal.woff2'],
];

export const loadFonts = () => {
  const handle = delayRender('fonts');
  Promise.all(
    faces.map(async ([family, weight, file]) => {
      const f = new FontFace(family, `url(${staticFile('fonts/' + file)})`, {weight: String(weight)});
      await f.load();
      document.fonts.add(f);
    }),
  )
    .then(() => continueRender(handle))
    .catch(() => continueRender(handle));
};
