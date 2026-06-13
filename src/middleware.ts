import createMiddleware from "next-intl/middleware";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { jwtDecode } from "jwt-decode";

import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

type TokenPayload = { userType: "SUPER_ADMIN" | "MARKETER"; };

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;
  const locale = pathname.split("/",)[1] || "en";
  const isLoginRoute = pathname.includes("/login");
  const isAdminRoute = pathname.includes("/admin");
  const isHomeRoute = pathname === `/${locale}`;

  if (!accessToken && (isAdminRoute || isHomeRoute)) {
    return NextResponse.redirect(new URL(`/${locale}/login`,request.url));}
    
  if (accessToken) {
    try {
      const decoded = jwtDecode<TokenPayload>(accessToken);

      const userType = decoded.userType;

      if (isLoginRoute) {
        if (userType === "SUPER_ADMIN") {
          return NextResponse.redirect(new URL(`/${locale}/admin`,request.url));
        }

        return NextResponse.redirect(new URL(`/${locale}`,request.url));
      }
      if (userType ==="MARKETER" && isAdminRoute) {
        return NextResponse.redirect(new URL(`/${locale}`,request.url));
      }
      if (userType ==="SUPER_ADMIN" && isHomeRoute) {
        return NextResponse.redirect(new URL(`/${locale}/admin`,request.url));
      }
    } catch {
      return NextResponse.redirect(new URL(`/${locale}/login`,request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
  ],
};