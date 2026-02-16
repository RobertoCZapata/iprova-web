import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const token = req.auth;
  const isAdmin = token?.user?.role === "admin";
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // Protect admin routes - only admins can access
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
});

// Protect these routes
export const config = {
  matcher: ["/admin/:path*"],
};
