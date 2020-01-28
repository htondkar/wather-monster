import React, { useCallback, useEffect, useRef } from 'react';

interface Props {
  onClick(): void
}

/**
 * This component watches for clicks that happen outside of the boundary of it.
 * it accepts a callback that is called when click happens
 */
export const ClickOutside: React.FunctionComponent<Props> = ({ onClick, children }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!ref) return

      if (!ref.current?.contains(event.target as HTMLElement)) {
        onClick()
      }
    },
    [onClick]
  )

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])

  return <div ref={ref}>{children}</div>
}
