import React from 'react'

export default function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '10px',
  enabled = true,
}) {
  const { current } = target
  React.useEffect(() => {
    if (!enabled || !current) {
      return
    }
    console.log('fires')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => entry.isIntersecting && onIntersect())
      },
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    )

    const el = target && target.current

    if (!el) {
      return
    }

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }

  }, [current, enabled, onIntersect, root, rootMargin, target, threshold])
}

