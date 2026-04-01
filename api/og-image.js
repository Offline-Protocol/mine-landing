/**
 * Dynamic OG image generator
 * Returns an SVG that social platforms render as the link preview card
 *
 * Usage: /api/og?ref=CODE&u=username
 */
function generateOGImage(referralCode, username) {
  const hasReferral = referralCode && referralCode.length > 0;
  const displayName = username ? `@${username}` : null;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#000000"/>
      <stop offset="100%" style="stop-color:#0a0a0a"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2F66F6"/>
      <stop offset="50%" style="stop-color:#4FFFA8"/>
      <stop offset="100%" style="stop-color:#00F0FF"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="1200" height="4" fill="url(#accent)"/>

  <!-- Subtle glow -->
  <circle cx="200" cy="150" r="300" fill="#2F66F6" opacity="0.06"/>
  <circle cx="900" cy="500" r="250" fill="#4FFFA8" opacity="0.04"/>

  <!-- App name -->
  <text x="80" y="200" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="72" font-weight="700" fill="#FFFFFF">Mine</text>
  <text x="80" y="245" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" font-size="24" fill="#8E8E93" font-weight="400">by Offline Protocol</text>

  <!-- Main message -->
  ${hasReferral && displayName
    ? `<text x="80" y="340" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="36" font-weight="600" fill="#FFFFFF">${displayName} invited you to</text>
       <text x="80" y="390" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="36" font-weight="600" fill="#FFFFFF">help build the world's largest</text>
       <text x="80" y="440" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="36" font-weight="600" fill="#FFFFFF">mesh network.</text>`
    : hasReferral
    ? `<text x="80" y="340" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="36" font-weight="600" fill="#FFFFFF">You've been invited to help</text>
       <text x="80" y="390" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="36" font-weight="600" fill="#FFFFFF">build the world's largest</text>
       <text x="80" y="440" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="36" font-weight="600" fill="#FFFFFF">mesh network.</text>`
    : `<text x="80" y="340" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="36" font-weight="600" fill="#FFFFFF">Help build the world's largest</text>
       <text x="80" y="390" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="36" font-weight="600" fill="#FFFFFF">mesh network.</text>`
  }

  <!-- Feature pills -->
  <rect x="80" y="490" rx="8" ry="8" width="120" height="36" fill="#1E1E1E"/>
  <text x="140" y="514" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" font-size="14" fill="#2F66F6" text-anchor="middle" font-weight="600">Mesh</text>

  <rect x="216" y="490" rx="8" ry="8" width="120" height="36" fill="#1E1E1E"/>
  <text x="276" y="514" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" font-size="14" fill="#32D74B" text-anchor="middle" font-weight="600">Missions</text>

  <rect x="352" y="490" rx="8" ry="8" width="120" height="36" fill="#1E1E1E"/>
  <text x="412" y="514" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" font-size="14" fill="#00F0FF" text-anchor="middle" font-weight="600">Points</text>

  ${hasReferral ? `
  <!-- Referral code -->
  <rect x="80" y="550" rx="8" ry="8" width="200" height="36" fill="rgba(47,102,246,0.1)" stroke="#2F66F6" stroke-width="1" stroke-opacity="0.2"/>
  <text x="100" y="574" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" font-size="12" fill="#8E8E93" font-weight="500">CODE</text>
  <text x="145" y="574" font-family="'SF Mono', Menlo, monospace" font-size="16" fill="#2F66F6" font-weight="700" letter-spacing="2">${referralCode}</text>
  ` : ''}

  <!-- Bottom border -->
  <rect x="0" y="626" width="1200" height="4" fill="url(#accent)"/>
</svg>`;
}

module.exports = { generateOGImage };
