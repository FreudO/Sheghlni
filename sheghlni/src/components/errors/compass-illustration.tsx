export function CompassIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="#F4EFE3"
        stroke="#E8DEC5"
        strokeWidth="2"
      />
      <circle cx="60" cy="60" r="6" fill="#B8895A" />
      <path d="M60 20 L64 56 L60 60 L56 56 Z" fill="#B8895A" />
      <path d="M60 100 L56 64 L60 60 L64 64 Z" fill="#D9B690" fillOpacity="0.6" />
      <path d="M20 60 L56 56 L60 60 L56 64 Z" fill="#D9B690" fillOpacity="0.4" />
      <path d="M100 60 L64 64 L60 60 L64 56 Z" fill="#D9B690" fillOpacity="0.4" />
      <text
        x="60"
        y="14"
        textAnchor="middle"
        fill="#8892AB"
        fontSize="8"
        fontWeight="600"
      >
        ?
      </text>
    </svg>
  );
}
