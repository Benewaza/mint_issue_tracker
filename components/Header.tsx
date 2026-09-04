import Link from "next/link"
import { auth } from "@/auth"
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

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {session?.user?.email ?? "Not signed in"}
          </span>
          <Button render={<Link href="/issues/new" />} size="sm" nativeButton={false}>
            New Issue
          </Button>
        </div>

        <MainNavigation />

        <div className="ml-auto">
          <Button render={<Link href="/issues/new" />} size="sm" nativeButton={false}>
            New Issue
          </Button>
        </div>
      </div>

    </header>
  )
}

