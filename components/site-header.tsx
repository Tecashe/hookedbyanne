// "use client"

// import Link from "next/link"
// import { ShoppingCart, Heart, User, Menu } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useCart } from "@/hooks/use-cart"
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// export function SiteHeader() {
//   const { items } = useCart()
//   const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

//   const navigation = [
//     { name: "Shop", href: "/products" },
//     { name: "New Arrivals", href: "/products?filter=new" },
//     { name: "Gallery", href: "/gallery" },
//     { name: "Try On", href: "/try-on" },
//     { name: "About", href: "/about" },
//   ]

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between">
//         <div className="flex items-center gap-8">
//           <Link href="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold text-primary">HookedByAnn</span>
//           </Link>

//           <nav className="hidden md:flex items-center gap-6">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </nav>
//         </div>

//         <div className="flex items-center gap-4">
//           <SignedIn>
//             <Button variant="ghost" size="icon" asChild>
//               <Link href="/wishlist">
//                 <Heart className="h-5 w-5" />
//               </Link>
//             </Button>
//           </SignedIn>

//           <Button variant="ghost" size="icon" asChild className="relative">
//             <Link href="/cart">
//               <ShoppingCart className="h-5 w-5" />
//               {itemCount > 0 && (
//                 <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
//                   {itemCount}
//                 </span>
//               )}
//             </Link>
//           </Button>

//           <SignedIn>
//             <UserButton afterSignOutUrl="/">
//               <UserButton.MenuItems>
//                 <UserButton.Link label="Dashboard" labelIcon={<User className="h-4 w-4" />} href="/dashboard" />
//               </UserButton.MenuItems>
//             </UserButton>
//           </SignedIn>

//           <SignedOut>
//             <Button variant="ghost" size="sm" asChild>
//               <Link href="/sign-in">Sign In</Link>
//             </Button>
//           </SignedOut>

//           <Sheet>
//             <SheetTrigger asChild className="md:hidden">
//               <Button variant="ghost" size="icon">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right">
//               <nav className="flex flex-col gap-4 mt-8">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   )
// }



// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { ShoppingCart, Heart, User, Menu } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useCart } from "@/hooks/use-cart"
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
// import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

// export function SiteHeader() {
//   const { items } = useCart()
//   const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

//   const navigation = [
//     { name: "Shop", href: "/products" },
//     { name: "New Arrivals", href: "/products?filter=new" },
//     { name: "Gallery", href: "/gallery" },
//     { name: "Try On", href: "/try-on" },
//     { name: "About", href: "/about" },
//   ]

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 md:h-20 items-center justify-between gap-4">
//         <Link href="/" className="flex items-center gap-2 shrink-0">
//           <div className="relative h-10 w-10 md:h-12 md:w-12">
//             <Image src="/logo.png" alt="HookedByAnn Logo" fill className="object-contain" priority />
//           </div>
//           <span className="hidden sm:inline text-xl md:text-2xl font-bold text-primary">HookedByAnn</span>
//         </Link>

//         <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
//           {navigation.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>

//         <div className="flex items-center gap-2 md:gap-4">
//           <SignedIn>
//             <Button variant="ghost" size="icon" asChild className="shrink-0">
//               <Link href="/wishlist">
//                 <Heart className="h-5 w-5" />
//                 <span className="sr-only">Wishlist</span>
//               </Link>
//             </Button>
//           </SignedIn>

//           <Button variant="ghost" size="icon" asChild className="relative shrink-0">
//             <Link href="/cart">
//               <ShoppingCart className="h-5 w-5" />
//               <span className="sr-only">Shopping Cart</span>
//               {itemCount > 0 && (
//                 <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
//                   {itemCount}
//                 </span>
//               )}
//             </Link>
//           </Button>

//           <SignedIn>
//             <div className="hidden md:block">
//               <UserButton afterSignOutUrl="/">
//                 <UserButton.MenuItems>
//                   <UserButton.Link label="Dashboard" labelIcon={<User className="h-4 w-4" />} href="/dashboard" />
//                 </UserButton.MenuItems>
//               </UserButton>
//             </div>
//           </SignedIn>

//           <SignedOut>
//             <Button variant="ghost" size="sm" asChild className="hidden md:flex">
//               <Link href="/sign-in">Sign In</Link>
//             </Button>
//           </SignedOut>

//           <Sheet>
//             <SheetTrigger asChild className="lg:hidden">
//               <Button variant="ghost" size="icon" className="shrink-0">
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-[300px] sm:w-[400px]">
//               <div className="flex flex-col h-full">
//                 <div className="flex items-center justify-between mb-8">
//                   <div className="flex items-center gap-2">
//                     <div className="relative h-10 w-10">
//                       <Image src="/logo.png" alt="HookedByAnn" fill className="object-contain" />
//                     </div>
//                     <span className="text-lg font-bold text-primary">HookedByAnn</span>
//                   </div>
//                 </div>

//                 <nav className="flex flex-col gap-4">
//                   {navigation.map((item) => (
//                     <SheetClose asChild key={item.name}>
//                       <Link
//                         href={item.href}
//                         className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
//                       >
//                         {item.name}
//                       </Link>
//                     </SheetClose>
//                   ))}
//                 </nav>

//                 <div className="mt-auto pt-6 border-t space-y-4">
//                   <SignedIn>
//                     <SheetClose asChild>
//                       <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
//                         <Link href="/dashboard">
//                           <User className="mr-2 h-4 w-4" />
//                           My Dashboard
//                         </Link>
//                       </Button>
//                     </SheetClose>
//                   </SignedIn>

//                   <SignedOut>
//                     <SheetClose asChild>
//                       <Button className="w-full" asChild>
//                         <Link href="/sign-in">Sign In</Link>
//                       </Button>
//                     </SheetClose>
//                   </SignedOut>
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   )
// }


"use client"

import Link from "next/link"
import Image from "next/image"
import { User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { CartWishlistIcons } from "./cart-wishlist-icons"

export function SiteHeader() {
  const navigation = [
    { name: "Shop", href: "/products" },
    { name: "New Arrivals", href: "/products?filter=new" },
    { name: "Gallery", href: "/gallery" },
    { name: "Try On", href: "/try-on" },
    { name: "About", href: "/about" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 md:h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative h-10 w-10 md:h-12 md:w-12">
            <Image src="/logo.png" alt="HookedByAnn Logo" fill className="object-contain" priority />
          </div>
          <span className="hidden sm:inline text-xl md:text-2xl font-bold text-primary">HookedByAnn</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <CartWishlistIcons />

          <SignedIn>
            <div className="hidden md:block">
              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  <UserButton.Link label="Dashboard" labelIcon={<User className="h-4 w-4" />} href="/dashboard" />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          </SignedIn>

          <SignedOut>
            <Button variant="ghost" size="sm" asChild className="hidden md:flex">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="relative h-10 w-10">
                      <Image src="/logo.png" alt="HookedByAnn" fill className="object-contain" />
                    </div>
                    <span className="text-lg font-bold text-primary">HookedByAnn</span>
                  </div>
                </div>

                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto pt-6 border-t space-y-4">
                  <SignedIn>
                    <SheetClose asChild>
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/dashboard">
                          <User className="mr-2 h-4 w-4" />
                          My Dashboard
                        </Link>
                      </Button>
                    </SheetClose>
                  </SignedIn>

                  <SignedOut>
                    <SheetClose asChild>
                      <Button className="w-full" asChild>
                        <Link href="/sign-in">Sign In</Link>
                      </Button>
                    </SheetClose>
                  </SignedOut>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
