export function findSimilarString(options: string[], stringToMatch: string): string[] {
  if (options.length === 0 || !stringToMatch) return []

  return options.filter(option =>
    option
      .trim()
      .toLocaleLowerCase()
      .includes(stringToMatch.trim().toLocaleLowerCase())
  )
}
