# Department of Computer Science — front page

Static site, no build step. Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8080
```

## Files

- `index.html` — front page content
- `css/site.css` — palette, type, layout, responsive rules, scroll-driven animation styles
- `js/site.js` — GSAP / ScrollTrigger animation system, mobile nav, footer year

## Animation system

Powered by GSAP + ScrollTrigger (loaded via CDN). Key behaviors:

- **Hero** — oversized kinetic typography with staggered word reveals
- **Vision section** — pinned full-screen scene with kinetic typography and floating CS keywords (CODE, LOGIC, ARCH, SYS, AI)
- **Head of Department** (`#hod`) — photo and a message from the HOD, placed just before the Learning Hub
- **Learning Hub** (`#programmes`) — Notes, PYQs, PDFs and Roadmap action buttons (actions to be wired later)
- **Project** (`#research`) — best project cards with a custom following cursor and team details
- **Gallery** (`#faculty`) — seamless infinite image marquee that speeds up on hover, edge-faded with a duplicated track
- **Event** (`#news`) — expanding disclosure cards for upcoming events, placed first after the hero
- **Achievement** (`#terminal`) — student achievement cards
- **Theme wipe** — the page starts light; scrolling smoothly sweeps a thin image-comparison-style line downward, finishing the change to dark just before the HOD section. Everything from HOD onward stays dark, and photos counter-invert so their colours never change.
- **CTA** — light in the source so the wipe turns it dark along with the rest of the page
- **Navigation** — active state tracked by scroll position
- **Scroll grid** — fixed background grid that adapts to light/dark theme

Reduced motion (`prefers-reduced-motion`) disables all animation timelines and pins, showing content statically.

## Included

- Sticky header with mobile menu
- Hero with "at a glance" panel
- Pinned vision scene with floating typography
- Programmes, research groups, faculty, news, admissions block
- Infinite slider for the faculty section with `speedOnHover` behavior
- Light/dark theme transitions coordinated with scroll position
- Kinetic typography throughout section headings

## Replace before publishing

- `Your College` (header, hero eyebrow, footer) and the address / email / phone in the footer
- Programme details, statistics, news, admissions dates and the sample record covers — all placeholder content
- The accent colour `--accent` in `css/site.css`

Sample content is intentionally generic; none of the numbers or names are real.
