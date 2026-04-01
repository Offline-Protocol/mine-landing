let satori;
async function getSatori() {
  if (!satori) {
    const mod = await import('satori');
    satori = mod.default || mod;
  }
  return satori;
}
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

// Load fonts
let fontBold = null;
let fontRegular = null;

async function loadFonts() {
  if (fontBold && fontRegular) return;
  const fontsDir = path.join(__dirname, '..', 'fonts');
  if (!fs.existsSync(fontsDir)) fs.mkdirSync(fontsDir);

  // Bold
  const boldPath = path.join(fontsDir, 'Inter-Bold.ttf');
  if (fs.existsSync(boldPath)) {
    fontBold = fs.readFileSync(boldPath);
  } else {
    const resp = await fetch('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf');
    fontBold = Buffer.from(await resp.arrayBuffer());
    fs.writeFileSync(boldPath, fontBold);
  }

  // Regular
  const regPath = path.join(fontsDir, 'Inter-Regular.ttf');
  if (fs.existsSync(regPath)) {
    fontRegular = fs.readFileSync(regPath);
  } else {
    const resp = await fetch('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf');
    fontRegular = Buffer.from(await resp.arrayBuffer());
    fs.writeFileSync(regPath, fontRegular);
  }
}

// Load app icon as base64 data URI for embedding in Satori
let iconDataUri = null;
function getIconDataUri() {
  if (iconDataUri) return iconDataUri;
  const iconPath = path.join(__dirname, '..', 'public', 'icon-sm.png');
  if (fs.existsSync(iconPath)) {
    const data = fs.readFileSync(iconPath);
    iconDataUri = `data:image/png;base64,${data.toString('base64')}`;
  }
  return iconDataUri;
}

// Inline SVG icons matching Ionicons used in the app
const ICONS = {
  // globe-outline
  globe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z" fill="none" stroke="#2F66F6" stroke-miterlimit="10" stroke-width="32"/><path d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z" fill="none" stroke="#2F66F6" stroke-miterlimit="10" stroke-width="32"/><path d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34" fill="none" stroke="#2F66F6" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="#2F66F6" stroke-miterlimit="10" stroke-width="32" d="M256 48v416M464 256H48"/></svg>`,
  // flag-outline
  flag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path d="M80 464V68.14a8 8 0 014-6.9C91.81 56.06 112.92 48 160 48c64 0 145 46 208 46 28.71 0 42.19-7.4 52.16-14.31A8 8 0 01432 86.09V303.9a8 8 0 01-3.88 6.86C419.93 315.88 399.64 320 368 320c-60.35 0-145-46-208-46-36 0-58.25 5.49-72 10.8" fill="none" stroke="#32D74B" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="#32D74B" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 48v416"/></svg>`,
  // diamond-outline
  diamond: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path d="M35.42 188.21l207.75 269.46a16.17 16.17 0 0025.66 0l207.75-269.46a16.52 16.52 0 00.95-18.75L407.06 55.71A16.22 16.22 0 00393.27 48H118.73a16.22 16.22 0 00-13.79 7.71L34.47 169.46a16.52 16.52 0 00.95 18.75z" fill="none" stroke="#00F0FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="#00F0FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M48 176h416M256 48l-64 128 64 288 64-288-64-128M145 48l-32 128M367 48l32 128"/></svg>`,
};

async function generateOGImage(referralCode, username) {
  await loadFonts();

  const hasReferral = referralCode && referralCode.length > 0;
  const displayName = username ? `@${username}` : null;

  const inviteText = hasReferral && displayName
    ? `${displayName} invited you to help build the world's largest mesh network.`
    : hasReferral
    ? "You've been invited to help build the world's largest mesh network."
    : "Help build the world's largest mesh network.";

  const iconUri = getIconDataUri();

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
        // App identity row with real icon
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
              // App icon (real PNG)
              ...(iconUri ? [{
                type: 'img',
                props: {
                  src: iconUri,
                  width: 52,
                  height: 52,
                  style: { borderRadius: '12px' },
                },
              }] : []),
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: { fontSize: '22px', fontWeight: 700, color: '#FFFFFF' },
                        children: 'Mine',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: { fontSize: '14px', color: '#8E8E93', fontWeight: 400 },
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
        // Bottom row: feature icons with labels + referral code
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            },
            children: [
              // Feature items with icon + label
              ...[
                { label: 'Mesh', color: '#2F66F6', bgColor: 'rgba(47, 102, 246, 0.12)', icon: ICONS.globe },
                { label: 'Missions', color: '#32D74B', bgColor: 'rgba(50, 215, 75, 0.12)', icon: ICONS.flag },
                { label: 'Points', color: '#00F0FF', bgColor: 'rgba(0, 240, 255, 0.12)', icon: ICONS.diamond },
              ].map(f => ({
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#1E1E1E',
                    borderRadius: '10px',
                    padding: '10px 16px',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          width: '28px',
                          height: '28px',
                          borderRadius: '7px',
                          backgroundColor: f.bgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                        children: {
                          type: 'img',
                          props: {
                            src: `data:image/svg+xml;base64,${Buffer.from(f.icon).toString('base64')}`,
                            width: 16,
                            height: 16,
                          },
                        },
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: { fontSize: '15px', fontWeight: 600, color: f.color },
                        children: f.label,
                      },
                    },
                  ],
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
                    backgroundColor: 'rgba(47, 102, 246, 0.08)',
                    border: '1px solid rgba(47, 102, 246, 0.15)',
                    borderRadius: '10px',
                    padding: '10px 18px',
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: { fontSize: '12px', color: '#8E8E93', fontWeight: 500 },
                        children: 'CODE',
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '18px',
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
      ],
    },
  };

  const satoriFunc = await getSatori();
  const svg = await satoriFunc(markup, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: fontBold, weight: 700, style: 'normal' },
      { name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });

  return resvg.render().asPng();
}

module.exports = { generateOGImage };
