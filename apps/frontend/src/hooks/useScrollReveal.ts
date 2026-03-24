import { useEffect, useRef } from 'react'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px', once = true } = options
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('revealed')
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}

const REVEAL_SELECTOR = '.reveal, .reveal-left, .reveal-scale'

/**
 * Watches the entire document for elements with reveal classes —
 * both existing ones AND ones added later (e.g. after async data loads).
 */
export const useRevealAll = (containerRef?: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const root = (containerRef?.current ?? document.body) as Element

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            intersectionObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    )

    const observe = (el: Element) => {
      // Only observe elements that haven't been revealed yet
      if (!el.classList.contains('revealed')) {
        intersectionObserver.observe(el)
      }
    }

    // Observe elements already in the DOM
    root.querySelectorAll(REVEAL_SELECTOR).forEach(observe)

    // Watch for new elements added asynchronously (e.g. after API responses)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return
          const el = node as Element
          // Check the node itself
          if (el.matches(REVEAL_SELECTOR)) observe(el)
          // Check descendants
          el.querySelectorAll(REVEAL_SELECTOR).forEach(observe)
        })
      })
    })

    mutationObserver.observe(root, { childList: true, subtree: true })

    return () => {
      intersectionObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [containerRef])
}
