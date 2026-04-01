const satori = require('satori');
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

// Load a font for Satori (it requires explicit font data)
// Use Inter from Google Fonts bundled locally
let fontData = null;

async function loadFont() {
  if (fontData) return fontData;
  // Try local font first, fall back to fetching
  const localPath = path.join(__dirname, '..', 'fonts', 'Inter-Bold.ttf');
  if (fs.existsSync(localPath)) {
    fontData = fs.readFileSync(localPath);
  } else {
    // Fetch Inter Bold from Google Fonts
    const resp = await fetch('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf');
    fontData = Buffer.from(await resp.arrayBuffer());
    // Cache locally
    const fontsDir = path.join(__dirname, '..', 'fonts');
    if (!fs.existsSync(fontsDir)) fs.mkdirSync(fontsDir);
    fs.writeFileSync(localPath, fontData);
  }
  return fontData;
}

let fontDataRegular = null;

async function loadFontRegular() {
  if (fontDataRegular) return fontDataRegular;
  const localPath = path.join(__dirname, '..', 'fonts', 'Inter-Regular.ttf');
  if (fs.existsSync(localPath)) {
    fontDataRegular = fs.readFileSync(localPath);
  } else {
    const resp = await fetch('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf');
    fontDataRegular = Buffer.from(await resp.arrayBuffer());
    const fontsDir = path.join(__dirname, '..', 'fonts');
    if (!fs.existsSync(fontsDir)) fs.mkdirSync(fontsDir);
    fs.writeFileSync(localPath, fontDataRegular);
  }
  return fontDataRegular;
}

async function generateOGImage(referralCode, username) {
  const hasReferral = referralCode && referralCode.length > 0;
  const displayName = username ? `@${username}` : null;

  const bold = await loadFont();
  const regular = await loadFontRegular();

  const inviteText = hasReferral && displayName
    ? `${displayName} invited you to help build the world's largest mesh network.`
    : hasReferral
    ? "You've been invited to help build the world's largest mesh network."
    : "Help build the world's largest mesh network.";

  // Satori uses React-like JSX objects (as plain objects)
  const markup = {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000000',
        padding: '60px 70px',
        fontFamily: 'Inter',
      },
      children: [
        // Top accent bar
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #2F66F6, #4FFFA8, #00F0FF)',
            },
          },
        },
        // App identity row
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    backgroundColor: '#1E1E1E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#2F66F6',
                    border: '1px solid #2C2C2E',
                  },
                  children: 'M',
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: { fontSize: '24px', fontWeight: 700, color: '#FFFFFF' },
                        children: 'Mine',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: { fontSize: '16px', color: '#8E8E93', fontWeight: 400 },
                        children: 'by Offline Protocol',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        // Main invite text
        {
          type: 'div',
          props: {
            style: {
              fontSize: '42px',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.25,
              marginBottom: '40px',
              maxWidth: '900px',
            },
            children: inviteText,
          },
        },
        // Spacer
        { type: 'div', props: { style: { flex: 1 } } },
        // Bottom row: feature pills + referral code
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            },
            children: [
              // Feature pills
              ...[
                { label: 'Mesh', color: '#2F66F6' },
                { label: 'Missions', color: '#32D74B' },
                { label: 'Points', color: '#00F0FF' },
              ].map(f => ({
                type: 'div',
                props: {
                  style: {
                    backgroundColor: '#1E1E1E',
                    borderRadius: '8px',
                    padding: '8px 20px',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: f.color,
                  },
                  children: f.label,
                },
              })),
              // Spacer
              { type: 'div', props: { style: { flex: 1 } } },
              // Referral code
              ...(hasReferral ? [{
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: 'rgba(47, 102, 246, 0.1)',
                    border: '1px solid rgba(47, 102, 246, 0.2)',
                    borderRadius: '10px',
                    padding: '8px 18px',
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: { fontSize: '13px', color: '#8E8E93', fontWeight: 500 },
                        children: 'CODE',
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#2F66F6',
                          letterSpacing: '2px',
                        },
                        children: referralCode,
                      },
                    },
                  ],
                },
              }] : []),
            ],
          },
        },
        // Bottom accent bar
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #2F66F6, #4FFFA8, #00F0FF)',
            },
          },
        },
      ],
    },
  };

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: bold, weight: 700, style: 'normal' },
      { name: 'Inter', data: regular, weight: 400, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });

  return resvg.render().asPng();
}

module.exports = { generateOGImage };
