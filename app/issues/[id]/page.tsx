import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  formatLabel,
  priorityClassName,
  statusClassName,
} from "@/lib/issues"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"

type Props = {
  params: Promise<{ id: string }>
}

export default async function IssueDetailPage({ params }: Props) {
  const { id } = await params

  if (isNaN(Number(id))) notFound()

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  })

  if (!issue) notFound()

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Link
            href="/issues"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to issues
          </Link>
          <div className="space-y-2">
            <p className="text-sm tabular-nums text-muted-foreground">
              Issue #{issue.id}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              {issue.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-medium",
                  statusClassName(issue.status)
                )}
              >
                {formatLabel(issue.status)}
              </span>
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-medium",
                  priorityClassName(issue.priority)
                )}
              >
                {formatLabel(issue.priority)}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          render={<Link href={`/issues/${issue.id}/edit`} />}
          nativeButton={false}
        >
          Edit
        </Button>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
          <CardDescription>
            Opened{" "}
            <time dateTime={issue.createdAt.toISOString()}>
              {issue.createdAt.toLocaleDateString()}
            </time>
            {issue.updatedAt.getTime() !== issue.createdAt.getTime() ? (
              <>
                {" "}
                · Updated{" "}
                <time dateTime={issue.updatedAt.toISOString()}>
                  {issue.updatedAt.toLocaleDateString()}
                </time>
              </>
            ) : null}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {issue.description ? (
            <p className="whitespace-pre-wrap text-sm leading-6">
              {issue.description}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">No description provided.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
