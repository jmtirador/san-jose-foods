import { ImageResponse } from 'next/og'

// Branded link-unfurl card. The funnel is links pasted into WhatsApp, so every
// shared page needs a legit, on-brand preview instead of a broken-looking blank.
export const alt = 'San Jose Foods · International Meat Trade'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#232320',
          color: '#ffffff',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: '#D9182E' }} />
          <div style={{ fontSize: 24, letterSpacing: 8, color: '#D9182E', fontWeight: 700 }}>
            MEAT EXPORTS · COMERCIO DE CARNES
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            San Jose Foods
          </div>
          <div style={{ fontSize: 36, color: '#cfcbc4', maxWidth: 940, lineHeight: 1.3 }}>
            Res, cerdo y pollo de mayoreo · EE.UU. · Canadá · Brasil → México
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 24, color: '#a8a49d' }}>
          <div
            style={{
              background: '#D9182E',
              color: '#ffffff',
              padding: '10px 22px',
              borderRadius: 9999,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            USDA · CFIA · SIF
          </div>
          <div>Hidalgo, TX · 24/7 · LLC-Backed Credit · Cargo Insured</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
