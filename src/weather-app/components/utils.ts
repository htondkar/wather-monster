export function findSimilarString(options: string[], stringToMatch: string): string[] {
	if (options.length === 0) return []

	return options.filter(option =>
		option
			.trim()
			.toLowerCase()
			.includes(stringToMatch.trim().toLowerCase())
	)
}
