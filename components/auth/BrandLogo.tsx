/** Brand mark — mosque dome + crescent over an open book, on a green tile.
 *  Matches element #1 of the design spec. Reuse anywhere the logo is needed. */
export default function BrandLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="mtaLogoBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--green-500)" />
          <stop offset="1" stopColor="var(--green-700)" />
        </linearGradient>
      </defs>

      <rect width="48" height="48" rx="13" fill="url(#mtaLogoBg)" />

      {/* crescent moon */}
      <path d="M24 6.4a3.1 3.1 0 1 0 2.6 4.9 3.7 3.7 0 0 1-2.6-4.9Z" fill="#fff" />

      {/* pointed dome (mihrab) */}
      <path d="M15.5 27V20.5c0-5 3.8-8 8.5-8s8.5 3 8.5 8V27Z" fill="#fff" fillOpacity="0.92" />
      <path d="M20 27v-6c0-2.6 1.8-4.3 4-4.3s4 1.7 4 4.3v6" stroke="var(--green-600)" strokeWidth="1.1" />

      {/* open book */}
      <path d="M10.5 30c5-3 11.5-3 13.5.4 2-3.4 8.5-3.4 13.5-.4v8.4c-5-3-11.5-3-13.5.2-2-3.2-8.5-3.2-13.5-.2Z" fill="#fff" />
      <path d="M24 30.4v8.2" stroke="var(--green-600)" strokeWidth="1.2" />
    </svg>
  );
}
