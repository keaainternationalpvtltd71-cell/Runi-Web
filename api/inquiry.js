/**
 * POST /api/inquiry: emails a website inquiry to RUNI's Microsoft 365 mailbox through Microsoft
 * Graph (client credentials). Runs as a Vercel serverless function; every credential is read
 * from server-side environment variables and never reaches the browser.
 *
 *   MS_TENANT_ID       Azure AD (Entra ID) tenant id
 *   MS_CLIENT_ID       App registration with the Mail.Send application permission
 *   MS_CLIENT_SECRET   Client secret of that app registration
 *   MS_SENDER_EMAIL    Mailbox the app sends from, e.g. info@runiindustries.eu
 *   INQUIRY_TO_EMAIL   Recipient (optional, defaults to MS_SENDER_EMAIL)
 */
import { createHash } from 'node:crypto';

const SUBJECT = 'New Website Inquiry - RUNI Industries';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 120, company: 160, email: 254, phone: 40, country: 80, inquiryType: 80, message: 5000, sourceUrl: 500 };
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;

/* Best effort only: a warm instance remembers recent submissions, a cold one starts empty. */
const recent = new Map();

const clean = (v, max) => String(v ?? '').replace(/\r\n?/g, '\n').trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/\s+/g, ' ');
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch { return null; }
}

function validate(raw) {
  const data = {
    name: oneLine(raw.name, LIMITS.name),
    company: oneLine(raw.company, LIMITS.company),
    email: oneLine(raw.email, LIMITS.email).toLowerCase(),
    phone: oneLine(raw.phone, LIMITS.phone),
    country: oneLine(raw.country, LIMITS.country),
    inquiryType: oneLine(raw.inquiryType, LIMITS.inquiryType),
    message: clean(raw.message, LIMITS.message),
  };
  const errors = {};
  if (!data.name) errors.name = 'Please enter your full name.';
  if (!data.email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (!data.message) errors.message = 'Please enter a message.';
  return { data, errors };
}

function sourceUrlOf(raw, req) {
  const candidate = oneLine(raw.sourceUrl, LIMITS.sourceUrl) || String(req.headers?.referer || '');
  try {
    const u = new URL(candidate);
    return /^https?:$/.test(u.protocol) ? u.href.slice(0, LIMITS.sourceUrl) : '';
  } catch { return ''; }
}

export function buildEmailHtml(data, meta) {
  const row = (label, value, multiline = false) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #DFE0E2;width:160px;vertical-align:top;color:#6B6C71;font-size:13px;font-weight:600;">${label}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #DFE0E2;color:#17181B;font-size:14px;${multiline ? 'white-space:pre-wrap;line-height:1.55;' : ''}">${value ? escapeHtml(value) : '<span style="color:#A4A3A8;">Not provided</span>'}</td>
        </tr>`;
  const email = escapeHtml(data.email);
  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#F5F6F7;font-family:Segoe UI,Roboto,Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;margin:0 auto;background:#ffffff;border:1px solid #DFE0E2;border-radius:8px;overflow:hidden;">
    <tr><td style="background:#0168B3;padding:18px 20px;color:#ffffff;">
      <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.85;">RUNI Industries</div>
      <div style="font-size:20px;font-weight:700;margin-top:4px;">New website inquiry</div>
    </td></tr>
    <tr><td style="padding:8px 6px 4px;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${[
        row('Full name', data.name),
        row('Company', data.company),
        `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #DFE0E2;width:160px;vertical-align:top;color:#6B6C71;font-size:13px;font-weight:600;">Email</td>
          <td style="padding:10px 14px;border-bottom:1px solid #DFE0E2;font-size:14px;"><a href="mailto:${email}" style="color:#0168B3;">${email}</a></td>
        </tr>`,
        row('Phone', data.phone),
        row('Country', data.country),
        row('Inquiry type', data.inquiryType),
        row('Message', data.message, true),
        row('Submitted', meta.submittedAt),
        row('Source URL', meta.sourceUrl),
      ].join('')}
      </table>
    </td></tr>
    <tr><td style="padding:14px 20px 20px;color:#6B6C71;font-size:12px;">Reply to this email to answer ${escapeHtml(data.name)} directly.</td></tr>
  </table>
</body></html>`;
}

async function graphToken(env) {
  const r = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(env.MS_TENANT_ID)}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: env.MS_CLIENT_ID, client_secret: env.MS_CLIENT_SECRET, scope: 'https://graph.microsoft.com/.default', grant_type: 'client_credentials' }),
  });
  if (!r.ok) throw new Error(`token request failed with ${r.status}`);
  return (await r.json()).access_token;
}

async function sendMail(env, { html, replyTo }) {
  const token = await graphToken(env);
  const to = env.INQUIRY_TO_EMAIL || env.MS_SENDER_EMAIL;
  const r = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(env.MS_SENDER_EMAIL)}/sendMail`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: {
        subject: SUBJECT,
        body: { contentType: 'HTML', content: html },
        toRecipients: to.split(',').map((a) => ({ emailAddress: { address: a.trim() } })),
        replyTo: [{ emailAddress: replyTo }],
      },
      saveToSentItems: true,
    }),
  });
  if (r.status !== 202) throw new Error(`sendMail failed with ${r.status}`);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const raw = parseBody(req);
  if (!raw) return res.status(400).json({ ok: false, error: 'Invalid request.' });

  // Honeypot: a filled hidden field means a bot. Answer as if it worked and send nothing.
  if (String(raw.website ?? '').trim()) return res.status(200).json({ ok: true });

  const { data, errors } = validate(raw);
  if (Object.keys(errors).length) return res.status(422).json({ ok: false, error: 'Please check the highlighted fields.', fields: errors });

  const now = Date.now();
  for (const [k, t] of recent) if (now - t > DUPLICATE_WINDOW_MS) recent.delete(k);
  const key = createHash('sha256').update(`${data.email}\n${data.message}`).digest('hex');
  if (recent.has(key)) return res.status(200).json({ ok: true, duplicate: true });

  const env = process.env;
  const missing = ['MS_TENANT_ID', 'MS_CLIENT_ID', 'MS_CLIENT_SECRET', 'MS_SENDER_EMAIL'].filter((k) => !env[k]);
  if (missing.length) {
    console.error(`inquiry: mail is not configured, missing ${missing.join(', ')}`);
    return res.status(503).json({ ok: false, error: 'The inquiry service is not available right now.' });
  }

  const submittedAt = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Europe/Amsterdam' }).format(new Date(now));
  const html = buildEmailHtml(data, { submittedAt, sourceUrl: sourceUrlOf(raw, req) });

  recent.set(key, now);
  try {
    await sendMail(env, { html, replyTo: { address: data.email, name: data.name } });
  } catch (e) {
    recent.delete(key);
    console.error(`inquiry: ${e.message}`);
    return res.status(502).json({ ok: false, error: 'Your inquiry could not be sent.' });
  }
  return res.status(200).json({ ok: true });
}
