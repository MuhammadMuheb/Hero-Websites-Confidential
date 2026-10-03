/** One live site in "Our Network". Safe to import from client components. */
export interface NetworkSite {
  slug: string;
  name: string;
  /** https URL of the site; always external. */
  publicUrl: string;
}
