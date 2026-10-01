import {Composition} from 'remotion';
import {Promo} from './Promo';
import {FPS, TOTAL} from './theme';
import {loadFonts} from './fonts';

loadFonts();

export const Root = () => (
  <>
    <Composition id="Vertical" component={Promo} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
