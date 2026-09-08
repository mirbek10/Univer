import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        {/* Vertical bar */}
        <div
          style={{
            position: 'absolute',
            width: 7,
            height: 22,
            borderRadius: 2,
            background: 'white',
            display: 'flex',
          }}
        />
        {/* Horizontal bar */}
        <div
          style={{
            position: 'absolute',
            width: 22,
            height: 7,
            borderRadius: 2,
            background: 'white',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
