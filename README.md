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

The pick-three form posts to `api/picks.js`, a Vercel function that emails the picks through [Resend](https://resend.com). In Vercel → Project → Settings → Environment Variables, add:

- `RESEND_API_KEY`: a Resend API key
- `PICKS_TO`: the address that receives submissions
- `PICKS_FROM` (optional): a sender on a domain verified in Resend. Without it, Resend's test sender is used, which only delivers to the email the Resend account was created with.

Then redeploy. Until the variables exist, the form shows "That didn't send" instead of pretending.

## Not wired up yet

- The Letterboxd link in `assets/site.js` points to letterboxd.com until the profile URL is added.
- Listening links show a placeholder message instead of opening NTS, YouTube or Qobuz.
