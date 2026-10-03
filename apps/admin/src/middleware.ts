import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge middleware only checks that a session cookie exists (firebase-admin cannot run on
 * the Edge runtime). Real verification, including revocation and the invite check, happens
 * in server code via getSessionUser().
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = Boolean(req.cookies.get("admin_session")?.value);
  const isPublic = pathname === "/login" || pathname === "/robots.txt";

  if (!hasSession && !isPublic) {
    if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
