import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { LaPalmaReel } from "./LaPalmaReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Instagram Reel — La Palma Starlight (24s, 9:16 vertical) */}
      <Composition
        id="LaPalmaReel"
        component={LaPalmaReel}
        durationInFrames={720}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Demo */}
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
