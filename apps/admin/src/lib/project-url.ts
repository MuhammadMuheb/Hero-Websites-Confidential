import type { Project } from "@/lib/types";

const HTTPS_URL = /^https:\/\/[^\s/$.?#][^\s]*$/i;
const HOSTNAME = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

/**
 * The address a visitor would open for this project: its public URL when it has a valid https one,
 * otherwise https:// plus its domain, otherwise nothing. Only https addresses are ever returned,
 * so the value is safe to put in an href.
 */
export function projectLiveUrl(project: Pick<Project, "publicUrl" | "domain">): string | null {
  const url = project.publicUrl?.trim();
  if (url && HTTPS_URL.test(url)) return url;
  const domain = project.domain?.trim();
  if (domain && HOSTNAME.test(domain)) return `https://${domain}`;
  return null;
}
