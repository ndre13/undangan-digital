type DecorativeLineProps = {
  className?: string
  light?: boolean
}

export function DecorativeLine({ className = '', light = false }: DecorativeLineProps) {
  return (
    <div
      className={`mx-auto h-px w-12 ${light ? 'bg-cream/40' : 'bg-taupe'} ${className}`}
      aria-hidden="true"
    />
  )
}

type SectionLabelProps = {
  children: string
  light?: boolean
  className?: string
}

export function SectionLabel({ children, light = false, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`font-sans text-[11px] font-medium uppercase tracking-[0.28em] ${
        light ? 'text-cream/70' : 'text-sage'
      } ${className}`}
    >
      {children}
    </p>
  )
}
