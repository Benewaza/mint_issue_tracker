import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="space-y-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
          <CardDescription>
            That page does not exist, or the issue you asked for could not be
            found.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button render={<Link href="/issues" />} nativeButton={false}>
            View issues
          </Button>
          <Button
            variant="outline"
            render={<Link href="/" />}
            nativeButton={false}
          >
            Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
