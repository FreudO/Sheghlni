export function EnvelopeIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect
        x="8"
        y="20"
        width="104"
        height="68"
        rx="10"
        fill="#F4EFE3"
        stroke="#D9B690"
        strokeWidth="2"
      />
      <path
        d="M8 30 L60 58 L112 30"
        stroke="#B8895A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="92" cy="28" r="14" fill="rgba(184, 137, 90, 0.15)" />
      <path
        d="M86 28 L90 32 L98 24"
        stroke="#B8895A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
