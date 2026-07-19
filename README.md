# Julieta Cozza — portfolio

React + Vite. Redesigned around a single idea: this is a filmmaker/editor's
site, so the interface borrows its vocabulary from the edit suite —
timecode, slate marks, letterboxing — instead of a generic dark-portfolio
template.

## Run it

```bash
npm install
npm run dev
```

`npm install` will pull in the new dependencies used by the redesign:
`framer-motion` (hover/scroll reveals, page transitions), `gsap` (hero
headline reveal), and `lenis` (smooth scroll). The old `package-lock.json`
is intentionally not carried over — a fresh `npm install` will regenerate
it against the new `package.json`.

## Structure

```
src/
  main.jsx              entry point
  App.jsx                page shell: home vs. category view, lang state
  index.css               single global stylesheet (tokens → components)
  data/categories.js      all content, untouched — es/en copy, media paths
  lib/useLenis.js         smooth-scroll hook (Lenis + GSAP ScrollTrigger)
  components/
    Cursor.jsx             custom cursor (dot → label ring on hover)
    Header.jsx              name/tagline, live timecode, language toggle
    Hero.jsx                 fullscreen opening shot (reel background)
    WorkGrid.jsx              "Selected work" — editorial CSS grid
    About.jsx                short bio section
    Contact.jsx                WhatsApp / email
    CategoryNav.jsx        sticky nav shown inside a case study
    CategoryView.jsx        the case study itself (was CategoryView)
    Media.jsx                video / YouTube / image renderer + custom controls
    PlaceholderImage.jsx     fallback pattern for missing thumbnails
```

## What changed from the previous version

- **Home page is a journey, not a dump.** Fullscreen hero (reel as
  atmosphere, not a UI element) → Selected Work → About → Contact, instead
  of every category exposed at once.
- **The old collage** (`CategoryWindow` + absolute-positioned `.window--*`
  classes) is gone. `WorkGrid` composes the same four categories on a real
  CSS Grid with editorial, uneven spans — no per-breakpoint magic-number
  positioning to maintain.
- **Cards are alive on hover**: image parallax/zoom, title lift, metadata
  reveal, and a custom cursor that expands into a "View" label — all in
  `WorkGrid.jsx` / `.work-card` in `index.css`.
- **Case studies breathe**: `CategoryView` got an index/total readout, more
  vertical rhythm, and scroll-triggered reveals per project instead of
  everything visible at once.
- **Custom cursor now actually exists.** The old CSS set `cursor: none`
  globally with no cursor element ever rendered — `Cursor.jsx` fixes that.
- **Fonts**: swapped the broken `Hibur Mono` / `Bebas Neue` pairing for
  `Fraunces` (editorial display serif, real italics) + `Space Mono`
  (kept — it fits the timecode/slate identity).
- **Content is untouched.** `data/categories.js` has the same categories,
  projects, copy and media paths as before, plus one addition: a short
  `site.about` placeholder (marked to replace, same convention as the
  existing TODOs) so the About section has real copy instead of lorem ipsum.

## Known gaps / next steps

- The work-grid cards preview a static thumbnail (`category.image`), not a
  looping clip — there's no per-category video field in the data yet.
  Adding one (e.g. `category.preview`) would let `WorkGrid` swap the image
  for a short muted loop on hover.
- Hero background uses the demo reel's YouTube embed, cropped to cover via
  CSS. Swapping in a self-hosted, compressed hero clip (see
  `compress-videos.sh`) would load faster and give you real control over
  the loop point — recommended before shipping.
- `site.about` copy is a placeholder — swap it for your own.
