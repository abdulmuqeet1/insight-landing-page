/**
 * Animated line-art icons. Each animates its inner parts on hover of the
 * parent `.group` (the card).
 */

const base = "h-full w-full text-primary";

export function ReceiptIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={base} aria-hidden>
      {/* floating receipt */}
      <g className="origin-center transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:rotate-3">
        <path
          d="M22 12h20a2 2 0 0 1 2 2v36l-5-3-5 3-5-3-5 3-4-3V14a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity={0.06}
        />
        <path
          d="M26 22h12M26 29h12M26 36h7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
      {/* magnifier sweeping in */}
      <g className="opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 [transform:translate(6px,6px)] group-hover:[transform:translate(0,0)]">
        <circle
          cx="42"
          cy="42"
          r="8"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="var(--background)"
        />
        <path d="m49 49 5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function SparkleIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={base} aria-hidden>
      <path
        d="M18 40h28a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="currentColor"
        fillOpacity={0.06}
      />
      <path
        d="M22 40v-6M32 40v-6M42 40v-6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* twinkles that pop on hover */}
      <g className="origin-center transition-all duration-500 group-hover:scale-110">
        <path
          d="M40 16l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z"
          fill="currentColor"
          className="origin-center transition-transform duration-700 group-hover:rotate-90"
        />
        <path
          d="M24 24l1.3 3.2L28.5 28l-3.2 1.3L24 32l-1.3-3.2L19.5 28l3.2-.8L24 24Z"
          fill="currentColor"
          className="opacity-50 transition-opacity duration-500 group-hover:opacity-100"
        />
      </g>
    </svg>
  );
}

export function InvoiceIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={base} aria-hidden>
      <rect
        x="16"
        y="12"
        width="32"
        height="40"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="currentColor"
        fillOpacity={0.06}
      />
      <path
        d="M23 22h18M23 30h18M23 38h10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* check badge stamps in */}
      <g className="origin-center scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
        <circle cx="44" cy="44" r="9" fill="currentColor" />
        <path
          d="m40 44 3 3 5-6"
          stroke="var(--background)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function ChartIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={base} aria-hidden>
      <path d="M16 14v36h36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {[
        { x: 24, h: 10 },
        { x: 33, h: 18 },
        { x: 42, h: 26 },
      ].map((b, i) => (
        <rect
          key={b.x}
          x={b.x}
          y={48 - b.h}
          width="6"
          height={b.h}
          rx="2"
          fill="currentColor"
          className="origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-110"
          style={{ transformBox: "fill-box", transitionDelay: `${i * 90}ms` }}
        />
      ))}
      {/* trend arrow */}
      <path
        d="M24 34l9-7 8 4 6-9"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </svg>
  );
}
