import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── helpers ─────────────────────────────────────────────────────────────────

function useFadeSpring(delay = 0, damping = 12) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness: 100, mass: 0.5 } });
}

// Random-ish but deterministic star positions
const STARS = Array.from({ length: 80 }, (_, i) => ({
  x: ((i * 137.508 + 13) % 100),
  y: ((i * 97.321 + 7) % 100),
  r: 0.8 + ((i * 31) % 10) / 12,
  opacity: 0.3 + ((i * 19) % 10) / 14,
}));

const StarField: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <svg
    width="100%"
    height="100%"
    style={{ position: "absolute", inset: 0, opacity }}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    {STARS.map((s, i) => (
      <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.opacity} />
    ))}
  </svg>
);

// ─── Scene 1 — Hook ──────────────────────────────────────────────────────────

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const exit  = interpolate(frame, [155, 190], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alpha = enter * exit;

  const p1 = useFadeSpring(10);
  const p2 = useFadeSpring(30);

  return (
    <AbsoluteFill
      style={{
        opacity: alpha,
        background: "linear-gradient(175deg, #000010 0%, #050028 55%, #0d0040 100%)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 28,
        padding: "0 60px",
      }}
    >
      <StarField opacity={0.9} />

      <div
        style={{
          fontSize: 88,
          fontWeight: 900,
          color: "#fff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          textAlign: "center",
          lineHeight: 1.1,
          opacity: p1,
          transform: `translateY(${interpolate(p1, [0, 1], [50, 0])}px)`,
          textShadow: "0 0 40px rgba(160,120,255,0.7)",
        }}
      >
        ¿Sabías que...?
      </div>

      <div
        style={{
          fontSize: 52,
          fontWeight: 400,
          color: "#c9b8ff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          textAlign: "center",
          lineHeight: 1.35,
          opacity: p2,
          transform: `translateY(${interpolate(p2, [0, 1], [30, 0])}px)`,
        }}
      >
        esta isla tiene el mayor{"\n"}secreto del mundo 🌌
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2 — Reveal ────────────────────────────────────────────────────────

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const exit  = interpolate(frame, [160, 200], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alpha = enter * exit;

  const p1 = useFadeSpring(5);
  const p2 = useFadeSpring(25);
  const p3 = useFadeSpring(50);
  const p4 = useFadeSpring(75);

  return (
    <AbsoluteFill
      style={{
        opacity: alpha,
        background: "linear-gradient(160deg, #080025 0%, #12005e 40%, #2a006e 70%, #050020 100%)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 32,
        padding: "0 64px",
      }}
    >
      <StarField opacity={0.6} />

      <div
        style={{
          opacity: p1,
          transform: `scale(${interpolate(p1, [0, 1], [0.5, 1])})`,
          fontSize: 120,
          lineHeight: 1,
        }}
      >
        🌋
      </div>

      <div
        style={{
          opacity: p2,
          transform: `translateY(${interpolate(p2, [0, 1], [40, 0])}px)`,
          fontSize: 100,
          fontWeight: 900,
          color: "#fff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          textAlign: "center",
          lineHeight: 1,
          letterSpacing: "-2px",
          textShadow: "0 0 60px rgba(200,150,255,0.8)",
        }}
      >
        LA PALMA
      </div>

      <div
        style={{
          opacity: p3,
          transform: `translateY(${interpolate(p3, [0, 1], [30, 0])}px)`,
          fontSize: 54,
          fontWeight: 700,
          color: "#e8d5ff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          textAlign: "center",
          lineHeight: 1.25,
        }}
      >
        tiene el cielo más estrellado
      </div>

      <div
        style={{
          opacity: p4,
          transform: `translateY(${interpolate(p4, [0, 1], [30, 0])}px)`,
          background: "linear-gradient(90deg, #a259ff, #f72585)",
          borderRadius: 20,
          padding: "20px 48px",
          fontSize: 52,
          fontWeight: 900,
          color: "#fff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          textAlign: "center",
          boxShadow: "0 8px 40px rgba(162,89,255,0.5)",
        }}
      >
        ⭐ de Europa ⭐
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3 — Facts ─────────────────────────────────────────────────────────

const FactCard: React.FC<{
  emoji: string;
  title: string;
  sub: string;
  delay: number;
  accent: string;
}> = ({ emoji, title, sub, delay, accent }) => {
  const p = useFadeSpring(delay, 14);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${interpolate(p, [0, 1], [-60, 0])}px)`,
        display: "flex",
        alignItems: "center",
        gap: 24,
        background: "rgba(255,255,255,0.07)",
        border: `2px solid ${accent}`,
        borderRadius: 24,
        padding: "28px 36px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontSize: 60, lineHeight: 1 }}>{emoji}</div>
      <div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#ccc",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            marginTop: 4,
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const exit  = interpolate(frame, [155, 195], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alpha = enter * exit;
  const pTitle = useFadeSpring(10);

  return (
    <AbsoluteFill
      style={{
        opacity: alpha,
        background: "linear-gradient(170deg, #0a001f 0%, #150040 50%, #0a001f 100%)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 32,
        padding: "0 56px",
      }}
    >
      <StarField opacity={0.4} />

      <div
        style={{
          opacity: pTitle,
          transform: `translateY(${interpolate(pTitle, [0, 1], [-30, 0])}px)`,
          fontSize: 52,
          fontWeight: 900,
          color: "#fff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        Por qué es especial 👇
      </div>

      <FactCard emoji="🔭" title="1ª Reserva Starlight" sub="del mundo — declarada por UNESCO"  delay={20} accent="#a259ff" />
      <FactCard emoji="🌟" title="2.400 m de altitud"   sub="cielo limpio, sin contaminación"   delay={40} accent="#f72585" />
      <FactCard emoji="🌿" title="Isla más verde"        sub="de todas las Canarias"              delay={60} accent="#4cc9f0" />
    </AbsoluteFill>
  );
};

// ─── Scene 4 — CTA ───────────────────────────────────────────────────────────

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const p1 = useFadeSpring(15);
  const p2 = useFadeSpring(40);
  const p3 = useFadeSpring(65);

  const glow = interpolate(frame, [0, 30, 60, 90, 120], [0, 1, 0.6, 1, 0.6], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        opacity: enter,
        background: "linear-gradient(160deg, #1a0050 0%, #3d0070 35%, #6a0dad 70%, #9b00d4 100%)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40,
        padding: "0 60px",
      }}
    >
      <StarField opacity={0.5} />

      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.15)",
          transform: `scale(${1 + glow * 0.15})`,
          opacity: 1 - glow * 0.5,
        }}
      />

      <div style={{ opacity: p1, transform: `scale(${interpolate(p1, [0, 1], [0.6, 1])})`, fontSize: 110, lineHeight: 1 }}>
        🏝️
      </div>

      <div
        style={{
          opacity: p2,
          transform: `translateY(${interpolate(p2, [0, 1], [40, 0])}px)`,
          fontSize: 80,
          fontWeight: 900,
          color: "#fff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          textAlign: "center",
          lineHeight: 1.1,
          textShadow: "0 0 50px rgba(255,255,255,0.4)",
        }}
      >
        ¿Ya visitaste{"\n"}La Palma?
      </div>

      <div
        style={{
          opacity: p3,
          transform: `translateY(${interpolate(p3, [0, 1], [30, 0])}px)`,
          fontSize: 44,
          fontWeight: 600,
          color: "#e0c8ff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        Cuéntanos en los comentarios 👇{"\n"}¡Te leemos!
      </div>

      <div style={{ opacity: p3, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 8 }}>
        {["#LaPalma", "#IslasBonitas", "#Starlight", "#Canarias"].map((tag) => (
          <div
            key={tag}
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: "#c9a0ff",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Root composition ─────────────────────────────────────────────────────────

export const LaPalmaReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000010" }}>
      {/* Scene 1: Hook  0–7s  (0–210f) */}
      <Sequence from={0} durationInFrames={210}>
        <Scene1 />
      </Sequence>

      {/* Scene 2: Reveal  6–13s  (180–390f) */}
      <Sequence from={180} durationInFrames={210}>
        <Scene2 />
      </Sequence>

      {/* Scene 3: Facts  12–19s  (360–570f) */}
      <Sequence from={360} durationInFrames={210}>
        <Scene3 />
      </Sequence>

      {/* Scene 4: CTA  18–24s  (540–720f) */}
      <Sequence from={540} durationInFrames={180}>
        <Scene4 />
      </Sequence>
    </AbsoluteFill>
  );
};
