import type { SVGProps } from 'react';

type Brand = 'whatsapp' | 'instagram' | 'gmail';
type Props = SVGProps<SVGSVGElement> & { brand: Brand; size?: number };

/** Distinct, recognizable SVG brand marks (not generic circles or text glyphs). */
export function BrandIcon({ brand, size = 28, ...props }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    role: 'img' as const,
    focusable: false as const,
    ...props
  };

  if (brand === 'whatsapp') {
    return (
      <svg {...common} aria-label="WhatsApp logo">
        <path fill="#25D366" d="M16.02 2.2A13.55 13.55 0 0 0 4.44 22.78L2.6 29.5l6.88-1.8A13.58 13.58 0 1 0 16.02 2.2Z" />
        <path fill="#FFFFFF" d="M16.03 5.05a10.7 10.7 0 0 0-9.16 16.22l.35.56-1.1 4.02 4.12-1.08.54.32a10.7 10.7 0 1 0 5.25-20.04Zm5.98 15.28c-.25.7-1.45 1.34-2 1.4-.52.08-1.18.12-1.9-.1-.44-.14-1-.32-1.72-.63-3.02-1.3-5-4.32-5.15-4.52-.15-.2-1.23-1.63-1.23-3.12 0-1.49.78-2.22 1.05-2.52.27-.3.59-.37.78-.37h.56c.18 0 .42-.02.64.5.24.58.82 2.04.9 2.19.07.15.12.33.03.53-.1.2-.15.33-.3.5-.14.17-.3.38-.43.51-.15.14-.3.3-.13.59.17.3.75 1.23 1.62 1.99 1.1.98 2.03 1.29 2.33 1.43.3.15.47.13.65-.07.17-.2.74-.86.93-1.16.2-.3.39-.25.66-.15.27.1 1.71.81 2 .96.3.15.5.22.57.35.07.13.07.75-.18 1.45Z" />
      </svg>
    );
  }

  if (brand === 'instagram') {
    return (
      <svg {...common} aria-label="Instagram logo">
        <defs>
          <linearGradient id="instagramGradient" x1="2" y1="30" x2="30" y2="2" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFB02E" />
            <stop offset="0.48" stopColor="#F04475" />
            <stop offset="1" stopColor="#7C4DFF" />
          </linearGradient>
        </defs>
        <rect x="3.25" y="3.25" width="25.5" height="25.5" rx="7.4" fill="none" stroke="url(#instagramGradient)" strokeWidth="2.8" />
        <circle cx="16" cy="16" r="6.05" fill="none" stroke="url(#instagramGradient)" strokeWidth="2.8" />
        <circle cx="23.5" cy="8.75" r="1.8" fill="#F04475" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-label="Gmail logo">
      <path d="M3.5 25.8V7.15c0-1.1 1.27-1.72 2.14-1.04L16 13.7l10.36-7.59c.87-.68 2.14-.06 2.14 1.04V25.8" fill="none" stroke="#EA4335" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 8.35V25.8" fill="none" stroke="#4285F4" strokeWidth="3.1" strokeLinecap="round" />
      <path d="M28.5 8.35V25.8" fill="none" stroke="#34A853" strokeWidth="3.1" strokeLinecap="round" />
      <path d="M3.5 7.1 16 16.2 28.5 7.1" fill="none" stroke="#EA4335" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 25.8V8.1" fill="none" stroke="#4285F4" strokeWidth="3.1" strokeLinecap="round" />
      <path d="M28.5 25.8V8.1" fill="none" stroke="#34A853" strokeWidth="3.1" strokeLinecap="round" />
      <path d="M3.7 7.2 9.2 11.2" fill="none" stroke="#FBBC04" strokeWidth="3.1" strokeLinecap="round" />
      <path d="M28.3 7.2 22.8 11.2" fill="none" stroke="#EA4335" strokeWidth="3.1" strokeLinecap="round" />
    </svg>
  );
}
