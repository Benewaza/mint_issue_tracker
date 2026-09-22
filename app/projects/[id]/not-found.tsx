import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ProjectNotFound() {
  return (
    <div className="space-y-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Project not found</CardTitle>
          <CardDescription>
            This project does not exist or the id in the URL is invalid.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button render={<Link href="/projects" />} nativeButton={false}>
            Back to projects
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
