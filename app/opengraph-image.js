import { ImageResponse } from 'next/og'

export const alt = 'КММУ — Кыргызский международный медицинский университет'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1565C0 0%, #0288D1 60%, #01579B 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
          }}
        />

        {/* Medical cross icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 96,
              height: 96,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Vertical bar */}
            <div
              style={{
                position: 'absolute',
                width: 28,
                height: 88,
                borderRadius: 8,
                background: 'white',
                display: 'flex',
              }}
            />
            {/* Horizontal bar */}
            <div
              style={{
                position: 'absolute',
                width: 88,
                height: 28,
                borderRadius: 8,
                background: 'white',
                display: 'flex',
              }}
            />
          </div>
        </div>

        {/* University name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-1px',
              display: 'flex',
            }}
          >
            КММУ
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.88)',
              textAlign: 'center',
              maxWidth: 800,
              lineHeight: 1.4,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            Кыргызский международный медицинский университет
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 2,
              background: 'rgba(255,255,255,0.5)',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.7)',
              display: 'flex',
            }}
          >
            Медицина. Наука. Будущее.
          </div>
          <div
            style={{
              width: 40,
              height: 2,
              background: 'rgba(255,255,255,0.5)',
              display: 'flex',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
