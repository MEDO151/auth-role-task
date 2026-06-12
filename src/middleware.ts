import createMiddleware from "next-intl/middleware";
import {
  NextRequest,
  NextResponse,
} from "next/server";

import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;
  const locale = pathname.split("/")[1] || "en";
  const isLoginRoute = pathname.includes("/login");
  const isAdminRoute = pathname.includes("/admin");
  const isHomeRoute = pathname === `/${locale}`;
  const isProtectedRoute = isAdminRoute || isHomeRoute;
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
  if (isLoginRoute && accessToken) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
  ],
};