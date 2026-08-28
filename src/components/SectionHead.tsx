// Newspaper section head: 2px ink rule, big display title with a hanging mono
// index, and a meta line of real codes. Replaces the old gray section-bar strip.
export function SectionHead({
  index, title, meta, size = 'md',
}: {
  index?: string; title: string; meta?: string; size?: 'md' | 'lg'
}) {
  const titleSize = size === 'lg'
    ? 'clamp(2.5rem, 5vw, 4rem)'
    : 'clamp(1.9rem, 3.4vw, 2.75rem)'
  return (
    <div className="section-head">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-6">
        <h2 className="font-display font-semibold text-foreground tracking-[-0.02em] leading-none flex items-baseline gap-3" style={{ fontSize: titleSize }}>
          {index && <span className="doc-index shrink-0">{index}</span>}
          {title}
        </h2>
        {meta && <span className="meta shrink-0">{meta}</span>}
      </div>
      <div className="border-b border-border mt-4" />
    </div>
  )
}
