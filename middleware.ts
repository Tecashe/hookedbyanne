import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/products(.*)",
  "/gallery(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
])

const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()

  // Protect admin routes
  if (isAdminRoute(req)) {
    if (!userId) {
      return Response.redirect(new URL("/sign-in", req.url))
    }
    // Check if user is admin (you'll need to set this in Clerk metadata)
    const role = sessionClaims?.metadata?.role
    if (role !== "admin") {
      return Response.redirect(new URL("/", req.url))
    }
  }

  // Protect non-public routes
  if (!isPublicRoute(req) && !userId) {
    return Response.redirect(new URL("/sign-in", req.url))
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
