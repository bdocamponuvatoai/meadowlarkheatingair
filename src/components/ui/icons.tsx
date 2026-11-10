/** Decorative SVG icons. All are aria-hidden; pair them with visible text. */

/** The meadowlark mark. Colour comes from `currentColor`; the wing from `--bird-wing`. */
export function Bird() {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path
        d="M9 40c9-2 18-8 23-17 3-6 7-9 12-8l8 4-8 2c-1 7-6 14-14 17l-9 9 1-9-13 2Z"
        fill="currentColor"
      />
      <path d="M22 35c5-1 11-5 15-11-1 9-5 14-12 16l-3-5Z" fill="var(--bird-wing,#e6a071)" />
      <circle cx="43" cy="18.5" r="1.15" fill="var(--bird-wing,#e6a071)" />
      <path d="M8 50h42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}

/** Flame (heating), snowflake (cooling) or airflow (everything else). */
export function ServiceIcon({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      {kind === "heating" ? (
        <>
          <path d="M24 5C26 15 38 20 37 30a13 13 0 0 1-26 0c0-7 5-13 9-16-1 6 0 9 3 10 4-5 3-12 1-19Z" />
          <path d="M24 27c5 5 7 8 5 11a6 6 0 0 1-10-1c-1-3 2-7 5-10Z" />
        </>
      ) : kind === "cooling" ? (
        <>
          <path d="M24 4v40M7 14l34 20M7 34l34-20M18 8l6 6 6-6M18 40l6-6 6 6M8 21l8-2-2-8M40 27l-8 2 2 8M14 37l2-8-8-2M34 11l-2 8 8 2" />
        </>
      ) : (
        <>
          <path d="M5 18h26c10 0 10-13 2-13-5 0-7 4-6 7M5 25h33c8 0 8 12 1 12-4 0-6-3-5-6M5 32h16c9 0 9 11 1 11" />
        </>
      )}
    </svg>
  );
}

export function Sun() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <circle cx="24" cy="24" r="10" />
      <path d="M24 2v7m0 30v7M2 24h7m30 0h7M8.5 8.5l5 5m21 21 5 5M8.5 39.5l5-5m21-21 5-5" />
    </svg>
  );
}
