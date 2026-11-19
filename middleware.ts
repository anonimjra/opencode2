import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isAdminApi = pathname.startsWith('/api/admin');
  const isLoginPage = pathname === '/admin/login';

  if (!user) {
    if (isAdminApi) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } },
      );
    }
    if (!isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (user && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
