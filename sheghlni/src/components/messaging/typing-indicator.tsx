export function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-bg-elevated-2 px-4 py-3"
      role="status"
      aria-label="Typing"
    >
      <span className="size-2 animate-bounce rounded-full bg-ink-300 [animation-delay:0ms]" />
      <span className="size-2 animate-bounce rounded-full bg-ink-300 [animation-delay:150ms]" />
      <span className="size-2 animate-bounce rounded-full bg-ink-300 [animation-delay:300ms]" />
    </div>
  );
}
