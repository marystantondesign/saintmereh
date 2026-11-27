# saintmereh

The saintmereh artist site. A plain static site (HTML, CSS, a little JavaScript) hosted on Vercel.

This first build is intentionally grayscale: every box is a placeholder for a real photo or piece of work.

## Pages

- `/` Home: the slow landing animation, then the portrait and the three rooms
- `/about` The story, plus Text / Message / Call
- `/creations` → `/ceramics`, `/rugs`, `/photography`, `/apps`
- `/collections` → `/vhs` (with the pick-three game), `/found-photos`, `/cassettes`, `/stereographs`
- `/considerations` → `/watching`, `/listening`, `/neighborhood`, `/curious`

Shared styles and scripts live in `assets/`.

## Phone and desktop

The pages in the root are the phone layout. On screens 900px and wider, a small script in each page's `<head>` swaps in the matching desktop layout from `desktop/` at the same URL. The phone pages don't change at all; resizing across 900px reloads into the other layout. `vercel.json` turns on clean URLs, so `/about` serves `about.html`.

## VHS game emails

The pick-three form sends straight to saintmereh@gmail.com through [FormSubmit](https://formsubmit.co) (no account or server settings). The first submission triggers a one-time "Activate form" email; after clicking it, every submission arrives by email.

## Not wired up yet

- The Letterboxd link in `assets/site.js` points to letterboxd.com until the profile URL is added.
- Listening links show a placeholder message instead of opening NTS, YouTube or Qobuz.
