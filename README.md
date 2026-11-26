# saintmereh

The saintmereh artist site. A plain static site (HTML, CSS, a little JavaScript) hosted on Vercel.

This first build is intentionally grayscale: every box is a placeholder for a real photo or piece of work.

## Pages

- `/` Home: the slow landing animation, then the portrait and the three rooms
- `/about` The story, plus Text / Message / Call
- `/creations` → `/ceramics`, `/rugs`, `/photography`, `/apps`
- `/collections` → `/vhs` (with the pick-three game), `/found-photos`, `/cassettes`, `/stereographs`
- `/considerations` → `/watching`, `/listening`, `/neighborhood`, `/curious`

Shared styles and scripts live in `assets/`. `vercel.json` turns on clean URLs, so `/about` serves `about.html`.

## Not wired up yet

- The VHS pick-three form doesn't send anywhere yet.
- The Letterboxd link in `assets/site.js` points to letterboxd.com until the profile URL is added.
- Listening links show a placeholder message instead of opening NTS, YouTube or Qobuz.
