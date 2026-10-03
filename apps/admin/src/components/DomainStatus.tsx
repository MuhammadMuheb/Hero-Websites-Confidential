import { checkDomain } from "@/lib/domain-check";

/** Tells the editor whether the project's domain really reaches the web app, and what to do if it does not. */
export async function DomainStatus({ domain }: { domain: string }) {
  const status = await checkDomain(domain);

  if (status.state === "none") {
    return (
      <p className="max-w-2xl rounded-control border border-line bg-surface px-3 py-2 text-[13px] text-ink-muted">
        No domain yet. Add one below; the web app serves the project on it once it points there.
      </p>
    );
  }

  if (status.state === "connected") {
    return (
      <p role="status" className="max-w-2xl rounded-control bg-primary-soft px-3 py-2 text-[13px] text-primary">
        Connected: <strong>{domain}</strong> reaches the web app, so the project is served on it.
      </p>
    );
  }

  return (
    <div role="status" className="max-w-2xl space-y-2 rounded-control bg-warning-soft px-3 py-2 text-[13px] text-warning">
      <p>
        <strong>{domain}</strong> {status.state === "other" ? `answers (HTTP ${status.httpStatus}) but is not served by the web app. It is probably a parking page or another site.` : "did not answer within 5 seconds."}
      </p>
      <p>
        To connect it: in Vercel open the <strong>web</strong> project, Settings, Domains, and add <strong>{domain}</strong> (and <strong>www.{domain}</strong>). Then set the DNS records Vercel shows at the domain&rsquo;s registrar (usually an A record for the bare domain and a CNAME for www). Changes can take a few minutes to spread.
      </p>
    </div>
  );
}
