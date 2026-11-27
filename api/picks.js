// saintmereh: receives the VHS "pick three" game and emails it to you.
//
// Needs these environment variables in Vercel (Project → Settings → Environment Variables):
//   RESEND_API_KEY  your Resend API key (resend.com → API Keys)
//   PICKS_TO        the address that receives submissions
//   PICKS_FROM      optional; defaults to Resend's test sender, which can only
//                   deliver to the email your Resend account was created with.
//                   After verifying saintmereh.com in Resend, set it to e.g.
//                   "saintmereh <picks@saintmereh.com>".

const MAX = { name: 100, why: 2000, title: 160 };

function clean(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

function phoneOk(p) {
  if (!p) return null;
  if (/[A-Za-z]/.test(p)) return false;
  let d = p.replace(/[^0-9]/g, '');
  if (d.length === 11 && d[0] === '1') d = d.slice(1);
  return d.length === 10;
}

function igOk(i) {
  if (!i) return null;
  const h = i[0] === '@' ? i : '@' + i;
  return /^@[A-Za-z0-9._]{1,30}$/.test(h);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Send JSON.' });

  // Bots fill in the hidden "website" field; people never see it. Pretend it worked.
  if (clean(body.website, 200)) {
    console.log('picks: dropped by the bot trap');
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const phone = clean(body.phone, 40);
  const instagram = clean(body.instagram, 40);
  const why = clean(body.why, MAX.why);
  const picks = Array.isArray(body.picks) ? body.picks.slice(0, 3).map((t) => clean(t, MAX.title)).filter(Boolean) : [];

  const p = phoneOk(phone);
  const i = igOk(instagram);
  if (!name) return res.status(400).json({ error: 'Name is required.' });
  if (picks.length !== 3) return res.status(400).json({ error: 'Pick three tapes.' });
  if (!(p || i) || p === false || i === false) return res.status(400).json({ error: 'Add a valid phone number or Instagram handle.' });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.PICKS_TO;
  if (!key || !to) {
    console.log('picks: missing RESEND_API_KEY or PICKS_TO');
    return res.status(500).json({ error: 'Email is not set up yet.' });
  }

  const handle = instagram ? (instagram[0] === '@' ? instagram : '@' + instagram) : '';
  const lines = [
    name + ' picked three tapes:',
    '',
    picks.map((t, n) => '  ' + (n + 1) + '. ' + t).join('\n'),
    '',
    'Why: ' + (why || '(they skipped this)'),
    '',
    'Reach them:',
    phone ? '  Phone: ' + phone : null,
    handle ? '  Instagram: ' + handle + '  (https://www.instagram.com/' + handle.slice(1) + '/)' : null,
    '',
    'Sent from the VHS game on saintmereh.com',
  ].filter((l) => l !== null);

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.PICKS_FROM || 'saintmereh <onboarding@resend.dev>',
        to: [to],
        subject: 'VHS picks from ' + name,
        text: lines.join('\n'),
      }),
    });
    const info = await r.text();
    if (!r.ok) {
      console.log('picks: Resend refused', r.status, info);
      return res.status(502).json({ error: 'The email service refused the message.' });
    }
    console.log('picks: sent to Resend', info);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.log('picks: could not reach Resend', String(e));
    return res.status(502).json({ error: 'Could not reach the email service.' });
  }
};
