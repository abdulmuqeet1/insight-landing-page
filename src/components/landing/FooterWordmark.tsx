/**
 * Oversized decorative "WIZE ACCOUNTS" wordmark: white fill with a moving
 * gradient stroke (like the giant footer text on midday.ai).
 */
export function FooterWordmark() {
  return (
    <div className="mt-12 w-full overflow-hidden" aria-hidden>
      <svg
        viewBox="0 0 1300 150"
        className="w-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="wordmark-gradient"
            x1="0"
            y1="0"
            x2="0.3"
            y2="0"
            spreadMethod="repeat"
          >
            <stop offset="0" stopColor="var(--shell-accent)" />
            <stop offset="0.5" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--ai)" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="0 0"
              to="0.3 0"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        <text
          x="650"
          y="120"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="800"
          fontSize="135"
          letterSpacing="-4"
          fill="#ffffff"
          stroke="url(#wordmark-gradient)"
          strokeWidth="2.5"
        >
          WIZE ACCOUNTS
        </text>
      </svg>
    </div>
  );
}
