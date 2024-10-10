export const TypingIndicator = () => (
  <div className="flex h-[1lh] items-center justify-between gap-x-1">
    {[...Array(3).keys()].map((i) => (
      <span
        className="block aspect-1 w-1 shrink-0 grow-0 animate-bounce rounded-full bg-current"
        style={{ animationDelay: `${i * 100}ms` }}
        key={i}
      />
    ))}
  </div>
)
