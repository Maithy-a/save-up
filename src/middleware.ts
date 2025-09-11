import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, 
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // keeps auth cookies in sync
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    const pathname = request.nextUrl.pathname;

    const isAuthPage =
        pathname.startsWith("/signin") || pathname.startsWith("/signup");

    const isProtected =
        pathname === "/" ||
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/goals");

    if (!user && isProtected) {
        const url = request.nextUrl.clone();
        url.pathname = "/signin";
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
    }

    if (user && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return supabaseResponse;
}

export const config = {
    matcher: ["/", "/dashboard/:path*", "/goals/:path*", "/signin", "/signup"],
};
