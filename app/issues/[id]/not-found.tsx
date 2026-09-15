import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function IssueNotFound() {
  return (
    <div className="space-y-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Issue not found</CardTitle>
          <CardDescription>
            This issue does not exist or the id in the URL is invalid.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button render={<Link href="/issues" />} nativeButton={false}>
            Back to issues
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
