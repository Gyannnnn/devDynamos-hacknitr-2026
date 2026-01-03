import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"
import { MobileMenu } from "@/components/mobile-menu"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          {/* Logo Image */}
          <Image
            src="/logo.jpg"
            alt="MentorConnect Logo"
            width={40}
            height={40}
            className="shrink-0 "
            priority
            unoptimized
          />
          {/* Text */}
          <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-dm-sans)" }}>
            MentorConnect
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
          <UserMenu />
          <div className="sm:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}

