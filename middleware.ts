import createMiddleware from "next-intl/middleware";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { NextRequest, NextResponse } from "next/server";

export const locales = ["en", "kr"] as const;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

const aaa = createMiddleware({
  locales,
  defaultLocale: "kr",
  localeDetection: false,
  localePrefix:'as-needed'
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const locale = currentPath.split("/")[0];

  request.headers.set("locale", locale);

  const res = aaa(request);
  if (res) return res;

  return NextResponse.next();
}

export default middleware;
