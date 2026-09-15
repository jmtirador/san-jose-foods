import { ImageResponse } from 'next/og'

// Branded link-unfurl card. The funnel is links pasted into WhatsApp, so every
// shared page needs a legit, on-brand preview.
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
          background: '#131111',
          color: '#F7F5F3',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="54" height="37" viewBox="14.18 18.73 287.76 196.41" xmlns="http://www.w3.org/2000/svg">
            <path fill="#BF1A2C" d="M 297.9375 211.132812 L 220.339844 211.132812 C 219.65625 211.132812 219.03125 211.132812 218.34375 211.066406 C 216.222656 210.878906 214.164062 210.4375 212.167969 209.742188 C 205.371094 207.464844 199.632812 202.285156 196.699219 195.335938 L 164.824219 119.707031 L 205.621094 22.980469 C 214.164062 24.304688 221.589844 30.054688 225.082031 38.269531 L 254.773438 108.652344 L 258.140625 116.675781 L 261.574219 124.761719 Z" />
            <path fill="#EC1D27" d="M 220.339844 211.132812 C 219.65625 211.132812 219.03125 211.132812 218.34375 211.066406 C 216.222656 210.878906 214.164062 210.4375 212.171875 209.742188 C 205.371094 207.464844 199.632812 202.285156 196.699219 195.335938 L 164.824219 119.707031 L 205.621094 22.980469 C 214.164062 24.304688 221.589844 30.054688 225.082031 38.269531 L 254.773438 108.652344 L 258.140625 116.675781 L 261.570312 124.761719 L 297.9375 211.132812 Z" />
            <path fill="#BF1A2C" d="M 158.027344 103.597656 L 154.660156 111.621094 L 151.226562 119.707031 L 119.351562 195.335938 C 115.296875 204.941406 106.066406 211.132812 95.773438 211.132812 L 18.175781 211.132812 L 91.035156 38.269531 C 94.527344 30.054688 101.949219 24.304688 110.496094 22.980469 C 111.742188 22.789062 112.988281 22.726562 114.238281 22.726562 L 192.148438 22.726562 Z" />
          </svg>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>San Jose Foods</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 108, fontWeight: 700, lineHeight: 0.98, letterSpacing: -5 }}>Res. Cerdo. Pollo.</div>
          <div style={{ fontSize: 108, fontWeight: 700, lineHeight: 0.98, letterSpacing: -5, color: '#D9182E' }}>Hacia México.</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 26, color: '#A8A29E' }}>
          <div>USDA · CFIA · SIF</div>
          <div>Hidalgo, TX · WhatsApp 24/7</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
