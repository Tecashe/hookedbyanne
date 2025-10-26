import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/products(.*)",
  "/gallery(.*)",
  "/try-on(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
])

const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
  // Protect admin routes - check role in metadata
  if (isAdminRoute(req)) {
    await auth.protect((has) => {
      return has({ role: "admin" })
    })
  }

  // Protect non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
