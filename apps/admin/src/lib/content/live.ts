/**
 * True when the public site is serving this card: stored status is "published", or missing
 * (cards that predate the workflow). A pending edit (inReview) does not make a live card a draft.
 */
export function isLiveDoc(d: { status?: string }): boolean {
  return d.status === "published" || d.status === undefined;
}
