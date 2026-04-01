function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildReferralPage(referralCode, referrerUsername) {
  const hasReferral = referralCode && referralCode.length > 0;
  const safeCode = hasReferral ? escapeHtml(referralCode) : '';
  const safeUsername = referrerUsername ? escapeHtml(referrerUsername) : null;

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
  <meta property="og:url" content="https://mine.offlineprotocol.com${hasReferral ? '/download?ref=' + safeCode : ''}">
  <meta property="og:image" content="https://mine.offlineprotocol.com/icon-sm.png">
  <link rel="icon" type="image/png" href="/icon-sm.png">
  <script type="module" src="https://unpkg.com/ionicons@7.4.0/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@7.4.0/dist/ionicons/ionicons.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, sans-serif;
      background: #000000;
      color: #FFFFFF;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .container {
      max-width: 400px;
      width: 100%;
      margin: 20px;
    }

    .card {
      background: #121212;
      border-radius: 16px;
      border: 1px solid #1E1E1E;
      overflow: hidden;
    }

    .card-body {
      padding: 32px 24px 24px;
    }

    /* App identity */
    .app-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 24px;
    }

    .app-icon {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      overflow: hidden;
    }

    .app-icon img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .app-info h1 {
      font-size: 17px;
      font-weight: 700;
    }

    .app-info span {
      font-size: 13px;
      color: #8E8E93;
      font-weight: 400;
    }

    /* Invite */
    .invite {
      margin-bottom: 20px;
    }

    .invite h2 {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 8px;
      line-height: 1.2;
    }

    .invite p {
      font-size: 15px;
      color: #8E8E93;
      line-height: 1.5;
      font-weight: 400;
    }

    /* Referral code */
    .ref-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(47, 102, 246, 0.08);
      border: 1px solid rgba(47, 102, 246, 0.15);
      border-radius: 10px;
      padding: 10px 16px;
      margin: 12px 0 20px;
    }

    .ref-label {
      font-size: 11px;
      color: #8E8E93;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    .ref-code {
      font-size: 17px;
      font-weight: 700;
      color: #2F66F6;
      letter-spacing: 2px;
      font-family: 'SF Mono', 'Menlo', 'Consolas', monospace;
    }

    /* Features */
    .features {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 20px;
    }

    .feat {
      background: #1E1E1E;
      border-radius: 12px;
      padding: 14px 8px;
      text-align: center;
    }

    .feat-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 8px;
    }

    .feat-icon ion-icon {
      font-size: 18px;
    }

    .feat-icon.blue { background: rgba(47, 102, 246, 0.12); }
    .feat-icon.blue ion-icon { color: #2F66F6; }
    .feat-icon.green { background: rgba(50, 215, 75, 0.12); }
    .feat-icon.green ion-icon { color: #32D74B; }
    .feat-icon.cyan { background: rgba(0, 240, 255, 0.12); }
    .feat-icon.cyan ion-icon { color: #00F0FF; }

    .feat-name {
      font-size: 12px;
      font-weight: 600;
      color: #FFFFFF;
    }

    .feat-desc {
      font-size: 10px;
      color: #8E8E93;
      margin-top: 2px;
      font-weight: 400;
    }

    /* CTA */
    .cta {
      display: block;
      width: 100%;
      background: #2F66F6;
      color: #FFFFFF;
      text-decoration: none;
      padding: 14px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      transition: background 0.2s;
      border: none;
      cursor: pointer;
    }

    .cta:hover { background: #2558d4; }

    /* Footer */
    .footer {
      text-align: center;
      margin-top: 16px;
    }

    .footer a {
      font-size: 12px;
      color: #8E8E93;
      text-decoration: none;
      font-weight: 400;
    }

    .footer a:hover { color: #FFFFFF; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="card-body">

        <div class="app-row">
          <div class="app-icon">
            <img src="/icon-sm.png" alt="Mine">
          </div>
          <div class="app-info">
            <h1>Mine</h1>
            <span>by Offline Protocol</span>
          </div>
        </div>

        <div class="invite">
          ${hasReferral
            ? `<h2>You're in</h2><p>${safeUsername ? '<strong>@' + safeUsername + '</strong> invited you to' : 'A friend invited you to'} help build the world's largest mesh network. Connect with nearby devices, complete missions, and earn rewards for growing the network.</p>`
            : '<h2>Start Mining</h2><p>Help build the world\'s largest mesh network. Connect with nearby devices, complete missions, and earn rewards for growing the network.</p>'
          }
        </div>

        ${hasReferral ? `
        <div class="ref-pill">
          <span class="ref-label">Invite Code</span>
          <span class="ref-code">${safeCode}</span>
        </div>
        ` : ''}

        <div class="features">
          <div class="feat">
            <div class="feat-icon blue"><ion-icon name="globe-outline"></ion-icon></div>
            <div class="feat-name">Mesh</div>
            <div class="feat-desc">Relay nearby peers</div>
          </div>
          <div class="feat">
            <div class="feat-icon green"><ion-icon name="flag-outline"></ion-icon></div>
            <div class="feat-name">Missions</div>
            <div class="feat-desc">Complete daily tasks</div>
          </div>
          <div class="feat">
            <div class="feat-icon cyan"><ion-icon name="diamond-outline"></ion-icon></div>
            <div class="feat-name">Points</div>
            <div class="feat-desc">Earn as you grow</div>
          </div>
        </div>

        <a href="/download${hasReferral ? '?ref=' + encodeURIComponent(safeCode) : ''}" class="cta">
          Download Mine
        </a>

      </div>
    </div>

    <div class="footer">
      <a href="https://offlineprotocol.com">offlineprotocol.com</a>
    </div>
  </div>
</body>
</html>`;
}

module.exports = { buildReferralPage, escapeHtml };
