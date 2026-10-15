/** A role is current when its date range is open-ended ("Present" / "Presente" / "Actualidad"). */
export function isCurrentRole(employmentDates: string): boolean {
  return /present|presente|actualidad|actual/i.test(employmentDates);
}
