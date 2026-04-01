export default function handler(req, res) {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  const ref = req.query.ref || '';

  // TODO: Replace with actual App Store and Play Store URLs once published
  const IOS_STORE = 'https://apps.apple.com/app/mine-by-offline-protocol/id0000000000';
  const ANDROID_STORE = 'https://play.google.com/store/apps/details?id=com.offline.mine';

  // Mobile with app installed: Universal links / App Links handle it before reaching here.
  // If we get here on mobile, the app isn't installed — redirect to store.
  if (/iphone|ipad|ipod/i.test(userAgent)) {
    return res.redirect(302, IOS_STORE);
  }

  if (/android/i.test(userAgent)) {
    return res.redirect(302, ANDROID_STORE);
  }

  // Desktop or unknown — show the referral landing page
  const html = buildReferralPage(ref);
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
}

function buildReferralPage(referralCode) {
  const hasReferral = referralCode && referralCode.length > 0;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${hasReferral ? "You've been invited to Mine" : 'Mine by Offline Protocol'}</title>
  <meta name="description" content="Join the mesh network that rewards you for connecting.">
  <meta property="og:title" content="${hasReferral ? "You've been invited to Mine!" : 'Mine by Offline Protocol'}">
  <meta property="og:description" content="Join the mesh network that rewards you for connecting. Earn rewards by building the world's largest decentralized mesh network.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://mine.offlineprotocol.com${hasReferral ? '/download?ref=' + referralCode : ''}">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
      background: #000000;
      color: #FFFFFF;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* Ambient glow background */
    body::before {
      content: '';
      position: fixed;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(ellipse at 30% 20%, rgba(47, 102, 246, 0.08) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 80%, rgba(79, 255, 168, 0.04) 0%, transparent 50%);
      pointer-events: none;
    }

    .container {
      max-width: 400px;
      width: 100%;
      margin: 20px;
      position: relative;
      z-index: 1;
    }

    .card {
      background: #121212;
      border-radius: 20px;
      border: 1px solid #1E1E1E;
      overflow: hidden;
    }

    /* Top accent line */
    .accent-bar {
      height: 3px;
      background: linear-gradient(90deg, #2F66F6, #4FFFA8, #00F0FF);
    }

    .card-body {
      padding: 36px 28px 28px;
    }

    /* App identity */
    .app-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 28px;
    }

    .app-icon {
      width: 56px;
      height: 56px;
      background: #1E1E1E;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
      color: #2F66F6;
      border: 1px solid #2C2C2E;
    }

    .app-info h1 {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.3px;
    }

    .app-info span {
      font-size: 13px;
      color: #8E8E93;
    }

    /* Invite section */
    .invite {
      margin-bottom: 24px;
    }

    .invite h2 {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
      line-height: 1.2;
    }

    .invite p {
      font-size: 15px;
      color: #8E8E93;
      line-height: 1.5;
    }

    /* Referral code pill */
    .ref-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(47, 102, 246, 0.1);
      border: 1px solid rgba(47, 102, 246, 0.2);
      border-radius: 10px;
      padding: 10px 16px;
      margin: 16px 0 24px;
    }

    .ref-label {
      font-size: 12px;
      color: #8E8E93;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ref-code {
      font-size: 18px;
      font-weight: 700;
      color: #2F66F6;
      letter-spacing: 2px;
      font-family: 'SF Mono', 'Menlo', monospace;
    }

    /* Feature grid */
    .features {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      margin-bottom: 24px;
    }

    .feat {
      background: #1E1E1E;
      border-radius: 12px;
      padding: 14px 10px;
      text-align: center;
    }

    .feat-icon {
      width: 32px;
      height: 32px;
      background: rgba(47, 102, 246, 0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 8px;
      font-size: 16px;
    }

    .feat-icon.green { background: rgba(79, 255, 168, 0.1); }
    .feat-icon.cyan { background: rgba(0, 240, 255, 0.1); }

    .feat-name {
      font-size: 11px;
      font-weight: 600;
      color: #FFFFFF;
    }

    .feat-desc {
      font-size: 10px;
      color: #8E8E93;
      margin-top: 2px;
    }

    /* CTA button */
    .cta {
      display: block;
      width: 100%;
      background: #2F66F6;
      color: #FFFFFF;
      text-decoration: none;
      padding: 15px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      transition: background 0.2s;
      border: none;
      cursor: pointer;
    }

    .cta:hover { background: #2558d4; }

    /* Store badges */
    .stores {
      display: flex;
      gap: 10px;
      margin-top: 12px;
      justify-content: center;
    }

    .store {
      font-size: 12px;
      color: #8E8E93;
      text-decoration: none;
      padding: 6px 14px;
      border-radius: 8px;
      background: #1E1E1E;
      transition: color 0.2s;
    }

    .store:hover { color: #FFFFFF; }

    /* Footer */
    .footer {
      text-align: center;
      margin-top: 16px;
    }

    .footer a {
      font-size: 12px;
      color: #8E8E93;
      text-decoration: none;
    }

    .footer a:hover { color: #FFFFFF; }

    /* Pulse animation on CTA */
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(47, 102, 246, 0.4); }
      50% { box-shadow: 0 0 0 8px rgba(47, 102, 246, 0); }
    }

    .cta { animation: pulse 3s infinite; }
    .cta:hover { animation: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="accent-bar"></div>
      <div class="card-body">

        <div class="app-row">
          <div class="app-icon">M</div>
          <div class="app-info">
            <h1>Mine</h1>
            <span>by Offline Protocol</span>
          </div>
        </div>

        <div class="invite">
          ${hasReferral
            ? `<h2>You've been invited</h2>
               <p>Someone wants you to join their mesh network. Download Mine and start earning rewards together.</p>`
            : `<h2>Join the Network</h2>
               <p>Earn rewards by building the world's largest decentralized mesh network.</p>`
          }
        </div>

        ${hasReferral ? `
        <div class="ref-pill">
          <span class="ref-label">Invite Code</span>
          <span class="ref-code">${escapeHtml(referralCode)}</span>
        </div>
        ` : ''}

        <div class="features">
          <div class="feat">
            <div class="feat-icon">&#x1F4E1;</div>
            <div class="feat-name">Mesh</div>
            <div class="feat-desc">Connect via BLE</div>
          </div>
          <div class="feat">
            <div class="feat-icon green">&#x1F3AF;</div>
            <div class="feat-name">Missions</div>
            <div class="feat-desc">Earn by exploring</div>
          </div>
          <div class="feat">
            <div class="feat-icon cyan">&#x1F4B0;</div>
            <div class="feat-name">Rewards</div>
            <div class="feat-desc">Claim tokens</div>
          </div>
        </div>

        <a href="/download${hasReferral ? '?ref=' + encodeURIComponent(referralCode) : ''}" class="cta">
          Download Mine
        </a>

        <div class="stores">
          <a href="https://apps.apple.com/app/mine-by-offline-protocol/id0000000000" class="store">App Store</a>
          <a href="https://play.google.com/store/apps/details?id=com.offline.mine" class="store">Google Play</a>
        </div>

      </div>
    </div>

    <div class="footer">
      <a href="https://offlineprotocol.com">offlineprotocol.com</a>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
