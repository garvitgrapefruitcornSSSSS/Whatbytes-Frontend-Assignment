import type { SVGProps } from "react";

// lucide-react no longer ships brand logos, so these are simple inline SVGs.
type IconProps = SVGProps<SVGSVGElement>;

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63A20.9 20.9 0 0 0 14.24 4.5c-2.25 0-3.79 1.37-3.79 3.9v2.16H7.9v2.94h2.55V21h3.05Z" />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21 6.55a7.3 7.3 0 0 1-2.12.58 3.7 3.7 0 0 0 1.62-2.04 7.4 7.4 0 0 1-2.34.9 3.69 3.69 0 0 0-6.29 3.36A10.47 10.47 0 0 1 4.27 5.5a3.69 3.69 0 0 0 1.14 4.92 3.67 3.67 0 0 1-1.67-.46v.05a3.69 3.69 0 0 0 2.96 3.62 3.7 3.7 0 0 1-1.67.06 3.69 3.69 0 0 0 3.45 2.56A7.4 7.4 0 0 1 3 17.78a10.44 10.44 0 0 0 5.66 1.66c6.79 0 10.5-5.63 10.5-10.5l-.01-.48A7.5 7.5 0 0 0 21 6.55Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
