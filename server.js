const express = require('express');
const path = require('path');
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
