const express = require('express');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');
const { buildReferralPage, escapeHtml } = require('./lib/referral-page');
const { generateOGImage } = require('./api/og-image');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve .well-known files with correct content types
app.get('/.well-known/apple-app-site-association', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'public/.well-known/apple-app-site-association'));
});

app.get('/.well-known/assetlinks.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'public/.well-known/assetlinks.json'));
});

// Lookup referrer username from API
async function lookupReferrer(referralCode) {
  if (!referralCode) return null;
  try {
    const resp = await fetch(
      `https://api.offlineprotocol.com/api/v1/internal/users/by-referral-code/${encodeURIComponent(referralCode)}`
    );
    if (!resp.ok) return null;
    const data = await resp.json();
    return data.data?.user?.username || data.data?.username || null;
  } catch {
    return null;
  }
}

// Smart download — detects platform, redirects accordingly
app.get('/download', async (req, res) => {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  const ref = req.query.ref || '';

  // TODO: Replace with actual App Store and Play Store URLs once published
  const IOS_STORE = 'https://apps.apple.com/app/mine-by-offline-protocol/id0000000000';
  const ANDROID_STORE = 'https://play.google.com/store/apps/details?id=com.offline.mine';

  // Mobile — redirect to the right store
  if (/iphone|ipad|ipod/i.test(userAgent)) {
    return res.redirect(302, IOS_STORE);
  }

  if (/android/i.test(userAgent)) {
    return res.redirect(302, ANDROID_STORE);
  }

  // Desktop — show referral landing page with referrer info
  // Username can come from ?u= param (set by app when sharing) or API lookup
  const usernameParam = req.query.u || null;
  const referrerUsername = usernameParam || await lookupReferrer(ref);
  const html = buildReferralPage(ref, referrerUsername);
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// Dynamic OG image for link previews (PNG via Satori + resvg)
app.get('/api/og', async (req, res) => {
  try {
    const ref = req.query.ref || '';
    const username = req.query.u || null;
    const png = await generateOGImage(ref, username);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(png);
  } catch (err) {
    console.error('OG image error:', err);
    res.status(500).send('Failed to generate image');
  }
});

// Legal pages
function renderLegalPage(title, mdFile) {
  const md = fs.readFileSync(path.join(__dirname, 'legal', mdFile), 'utf8');
  const html = marked(md);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Mine by Offline Protocol</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif; background: #000; color: #fff; }
    .container { max-width: 720px; margin: 0 auto; padding: 40px 24px 80px; }
    .back { display: inline-block; color: #2F66F6; text-decoration: none; font-size: 14px; margin-bottom: 24px; }
    .back:hover { text-decoration: underline; }
    h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
    h2 { font-size: 20px; font-weight: 700; margin-top: 32px; margin-bottom: 12px; border-bottom: 1px solid #1E1E1E; padding-bottom: 8px; }
    h3 { font-size: 16px; font-weight: 600; margin-top: 24px; margin-bottom: 8px; }
    p { font-size: 15px; line-height: 1.7; color: #ccc; margin-bottom: 12px; }
    strong { color: #fff; }
    ul, ol { margin: 12px 0; padding-left: 24px; color: #ccc; }
    li { margin-bottom: 6px; font-size: 15px; line-height: 1.6; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
    th { text-align: left; padding: 8px; background: #1E1E1E; color: #fff; font-weight: 600; border: 1px solid #2C2C2E; }
    td { padding: 8px; border: 1px solid #2C2C2E; color: #ccc; vertical-align: top; }
    a { color: #2F66F6; }
    hr { border: none; border-top: 1px solid #1E1E1E; margin: 24px 0; }
    code { background: #1E1E1E; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
    pre { background: #1E1E1E; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 12px 0; }
    pre code { background: none; padding: 0; }
  </style>
</head>
<body>
  <div class="container">
    <a href="/" class="back">← Mine</a>
    ${html}
  </div>
</body>
</html>`;
}

app.get('/privacy', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(renderLegalPage('Privacy Policy', 'privacy.md'));
});

app.get('/terms', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(renderLegalPage('Terms of Service', 'terms.md'));
});

// Root — same as /download (no referral)
app.get('/', (req, res) => {
  const html = buildReferralPage(null, null);
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// Serve static files (.well-known, icon, etc. — but not index.html)
app.use(express.static('public', { index: false }));

app.listen(PORT, () => {
  console.log(`mine-landing running on port ${PORT}`);
});
