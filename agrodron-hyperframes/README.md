# AgroDron Canarias · promo en HyperFrames (HTML + GSAP)

Misma pieza que `../agrodron-promo` (Remotion) pero como composición HyperFrames: 1080x1920, 15 s, música incluida.
Todo está en `index.html` (escenas `#s1`–`#s6`, un único timeline GSAP). Fuentes, GSAP y música en `assets/` (sin CDN).

    npm install
    npm run dev       # Studio / preview
    npm run check     # lint + layout + contraste
    npm run render    # MP4  (necesita: npx hyperframes browser ensure)
