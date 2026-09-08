import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1565C0 0%, #0288D1 100%)',
          borderRadius: 38,
        }}
      >
        {/* Vertical bar of cross */}
        <div
          style={{
            position: 'absolute',
            width: 36,
            height: 110,
            borderRadius: 10,
            background: 'white',
            display: 'flex',
          }}
        />
        {/* Horizontal bar of cross */}
        <div
          style={{
            position: 'absolute',
            width: 110,
            height: 36,
            borderRadius: 10,
            background: 'white',
            display: 'flex',
          }}
        />
        {/* Center accent dot */}
        <div
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: '#1565C0',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
