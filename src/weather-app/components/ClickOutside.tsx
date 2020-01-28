import React, { useEffect, useRef, useCallback } from 'react'

interface Props {
	onClick(): void
}

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
