// components/cursor/LeafArtwork.tsx

export function LeafArtwork() {
  return (
    <>
      <path
        d="M17 89 C18 75 25 62 36 52"
        stroke="#086B50"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      <g data-leaf="left">
        <path
          d="
            M25 70
            C13 44 27 22 54 20
            C71 19 83 16 90 9
            C72 31 46 43 25 70
            Z
          "
          fill="#07966F"
        />
      </g>

      <g data-leaf="right">
        <path
          d="
            M25 70
            C46 43 72 31 90 9
            C91 43 79 67 56 73
            C43 77 32 74 25 70
            Z
          "
          fill="#087D5B"
        />
      </g>

      <path
        d="M25 70 C46 43 72 31 90 9"
        stroke="#E8EBD4"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}
