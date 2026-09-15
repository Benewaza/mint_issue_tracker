import Link from "next/link"

import { auth } from "@/auth"
import { logout } from "@/app/login/actions"
import { Button } from "@/components/ui/button"
import MainNavigation from "./MainNavigation"

export default async function Header() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-sm font-semibold tracking-tight text-foreground"
        >
          Mint Issue Tracker
        </Link>

        <MainNavigation />

        <div className="ml-auto flex items-center gap-2">
          {session?.user ? (
            <>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {session.user.email}
              </span>
              <Button render={<Link href="/issues/new" />} size="sm" nativeButton={false}>
                New Issue
              </Button>
              <form action={logout}>
                <Button type="submit" variant="outline" size="sm">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              render={<Link href="/login" />}
              nativeButton={false}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
