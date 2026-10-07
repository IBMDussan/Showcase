// ----------------------------------------------------------------
// people.ts — Name handling and anonymization
// Activate ?anon=1 in the URL to anonymize all names
// ----------------------------------------------------------------

/** Check if anonymization is active via URL param */
export function isAnonymized(): boolean {
  return new URLSearchParams(window.location.search).has('anon') ||
    new URLSearchParams(window.location.hash.split('?')[1] ?? '').has('anon')
}

/** Convert a full name to initials (e.g. "Juan García" → "JG") */
export function toInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * Anonymize a name if ?anon=1 is active.
 * Returns initials in anon mode, the original name otherwise.
 */
export function anonymize(name: string): string {
  return isAnonymized() ? toInitials(name) : name
}

/**
 * Anonymize an array of names.
 * Convenience wrapper around `anonymize`.
 */
export function anonymizeAll(names: string[]): string[] {
  return names.map(anonymize)
}

/** Format a person's display name, respecting anon mode */
export function displayName(name: string, role?: string): string {
  const n = anonymize(name)
  return role ? `${n} (${role})` : n
}
