# AgroDron Canarias · vídeo promocional (Remotion)

Vídeo vertical 1080x1920, 15 s, 100 % código (sin IA generativa de vídeo). Identidad tomada del código de la web:
grafito + verde señal `#C6F24E`, Space Grotesk / Inter / JetBrains Mono, HUD con grid de mapa.
La música (`public/music.wav`) está sintetizada por script: original, sin copyright.

    npm install
    npm run studio            # previsualizar
    npm run render:vertical   # -> out/agrodron-vertical.mp4

En entornos sin Chromium propio: `REMOTION_BROWSER=/ruta/a/headless_shell npm run render:vertical`.
Escenas en `src/scenes.tsx`, tiempos en `src/theme.ts`.
