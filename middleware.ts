import createMiddleware from "next-intl/middleware";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { NextRequest, NextResponse } from "next/server";

export const locales = ["en", "ko"] as const;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

const aaa = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "ko",
  localeDetection: false,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ko|en)/:path*"],
};

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const locale = currentPath.split("/")[0];
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("locale", locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export default middleware;
