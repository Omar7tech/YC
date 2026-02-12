'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

export type LogoMarqueeItem = {
  key: React.Key
  node: React.ReactNode
}

type LogoMarqueeProps = {
  items: LogoMarqueeItem[]
  gapPx?: number
  durationSec?: number
  pauseOnHover?: boolean
  className?: string
  ariaLabel?: string
}

export default function LogoMarquee({
  items,
  gapPx = 32,
  durationSec = 18,
  pauseOnHover = true,
  className,
  ariaLabel = 'Logos'
}: LogoMarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sequenceRef = useRef<HTMLDivElement | null>(null)

  const [sequenceWidth, setSequenceWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const container = containerRef.current
    const sequence = sequenceRef.current
    if (!container || !sequence) return

    const update = () => {
      const cw = container.getBoundingClientRect().width
      const sw = sequence.getBoundingClientRect().width
      if (Number.isFinite(cw)) setContainerWidth(Math.ceil(cw))
      if (Number.isFinite(sw)) setSequenceWidth(Math.ceil(sw))
    }

    update()

    if (!('ResizeObserver' in window)) {
      const w = window as unknown as Window
      w.addEventListener('resize', update)
      return () => w.removeEventListener('resize', update)
    }

    const ro = new ResizeObserver(update)
    ro.observe(container)
    ro.observe(sequence)

    return () => ro.disconnect()
  }, [items, gapPx])

  const copies = useMemo(() => {
    if (sequenceWidth <= 0 || containerWidth <= 0) return 2

    const minCopiesToFill = Math.ceil(containerWidth / sequenceWidth)
    return Math.max(2, minCopiesToFill + 2)
  }, [sequenceWidth, containerWidth])

  const sequences = useMemo(() => Array.from({ length: copies }, (_, i) => i), [copies])

  return (
    <div
      ref={containerRef}
      className={['logo-marquee', pauseOnHover ? 'logo-marquee--pause' : '', className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      style={
        {
          ['--logo-marquee-gap' as any]: `${gapPx}px`,
          ['--logo-marquee-duration' as any]: `${durationSec}s`,
          ['--logo-marquee-distance' as any]: sequenceWidth > 0 ? `${sequenceWidth}px` : undefined
        } as React.CSSProperties
      }
    >
      <div className="logo-marquee__track" aria-hidden>
        {sequences.map(seqIndex => (
          <div
            key={seqIndex}
            ref={seqIndex === 0 ? sequenceRef : undefined}
            className="logo-marquee__sequence"
            role="presentation"
          >
            {items.map(item => (
              <div key={item.key} className="logo-marquee__item">
                {item.node}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
