import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en-US', 'nl-NL', 'nl']

function getLocale() {
  let headers = { 'accept-language': 'en-US,en;q=0.5' }
  let languages = new Negotiator({ headers }).languages()
  let defaultLocale = 'en-US'

  return match(languages, locales, defaultLocale) // -> 'en-US'
}

import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'nl'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en'
});

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path.includes('/login');

  const token = request.cookies.get('token')?.value || '';

  // Check if there is any supported locale in the pathname
  // const pathname = request.nextUrl.pathname
  // const pathnameIsMissingLocale = locales.every(
  //   (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  // )

  // const locale = getLocale();

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL(`/`, request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL(`/login`, request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/login',
    '/resources',
    '/signup',
    '/((?!api|_next|.*\\..*).*)',
  ]
}