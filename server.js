const express = require('express');
const path = require('path');
const { buildReferralPage, escapeHtml } = require('./lib/referral-page');

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

// Download endpoint — mobile redirects to store, desktop shows landing page
app.get('/download', (req, res) => {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  const ref = req.query.ref || '';

  // TODO: Replace with actual App Store and Play Store URLs once published
  const IOS_STORE = 'https://apps.apple.com/app/mine-by-offline-protocol/id0000000000';
  const ANDROID_STORE = 'https://play.google.com/store/apps/details?id=com.offline.mine';

  if (/iphone|ipad|ipod/i.test(userAgent)) {
    return res.redirect(302, IOS_STORE);
  }

  if (/android/i.test(userAgent)) {
    return res.redirect(302, ANDROID_STORE);
  }

  // Desktop — show referral landing page
  const html = buildReferralPage(ref);
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// Serve static files (index.html, etc.)
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`mine-landing running on port ${PORT}`);
});
