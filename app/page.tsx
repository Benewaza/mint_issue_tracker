import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const [openCount, inProgressCount, closedCount] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ])

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your issues and projects.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/issues?status=OPEN" className="block">
          <Card size="sm" className="h-full transition-colors hover:bg-muted/40">
            <CardHeader>
              <CardDescription>Open</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{openCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Issues waiting on work</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/issues?status=IN_PROGRESS" className="block">
          <Card size="sm" className="h-full transition-colors hover:bg-muted/40">
            <CardHeader>
              <CardDescription>In progress</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{inProgressCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Currently being worked on</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/issues?status=CLOSED" className="block">
          <Card size="sm" className="h-full transition-colors hover:bg-muted/40">
            <CardHeader>
              <CardDescription>Closed</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{closedCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Resolved this period</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get started</CardTitle>
          <CardDescription>
            Create a new issue or browse the full list.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button render={<Link href="/issues/new" />} nativeButton={false}>
            New Issue
          </Button>
          <Button variant="outline" render={<Link href="/issues" />} nativeButton={false}>
            View Issues
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
