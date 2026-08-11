import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your issues and projects.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card size="sm">
          <CardHeader>
            <CardDescription>Open</CardDescription>
            <CardTitle className="text-2xl tabular-nums">—</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Issues waiting on work</p>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardDescription>In progress</CardDescription>
            <CardTitle className="text-2xl tabular-nums">—</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Currently being worked on</p>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardDescription>Closed</CardDescription>
            <CardTitle className="text-2xl tabular-nums">—</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Resolved this period</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get started</CardTitle>
          <CardDescription>
            Create your first issue or browse the issue list once the database is
            connected.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button render={<Link href="/issues/new" />} nativeButton={false}>New Issue</Button>
          <Button variant="outline" render={<Link href="/issues" />} nativeButton={false}>
            View Issues
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
