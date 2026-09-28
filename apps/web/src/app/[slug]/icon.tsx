import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * Per-property favicon. Next.js resolves the most specific `icon` file for a
 * route, so this file (not the root app/icon.tsx) serves every /{slug} and
 * /{slug}/... request — it has to replicate the root's red fork/knife mark
 * for every property except the one that needs its own branding, so those
 * still see exactly what they'd get from the root icon.
 *
 * Underground Colosseum gets its own mark — matching the header's BrandMark
 * in components/UndergroundColosseumHome.tsx: three classical arches (the
 * Colosseum's actual architectural motif) on a ground line, inside a
 * red-gradient squircle, in place of the platform's default fork/knife
 * circle, so its browser tab is recognizably its own property.
 */
export default async function Icon({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === 'underground-colosseum') {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #ff3344, #b8001c)',
            borderRadius: '22%',
          }}
        >
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
            <path d="M5 18v-4a2 2 0 1 1 4 0v4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 18v-5a2 2 0 1 1 4 0v5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 18v-4a2 2 0 1 1 4 0v4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 18.5h16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      ),
      { ...size },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0F7A4D',
          borderRadius: '50%',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 3v7a2 2 0 0 0 2 2v9M6 3a2 2 0 0 0-2 2M6 3a2 2 0 0 1 2 2v5M18 3c-1.6 0-3 2-3 6s1.4 5 3 5v7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
