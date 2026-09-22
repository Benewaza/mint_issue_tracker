import Link from "next/link"
import { notFound } from "next/navigation"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params

  if (isNaN(Number(id))) notFound()

  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
    include: {
      issues: {
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!project) notFound()

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <Link
          href="/projects"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to projects
        </Link>
        <div className="space-y-2">
          <p className="text-sm tabular-nums text-muted-foreground">
            Project #{project.id}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {project.name}
          </h1>
          {project.description ? (
            <p className="text-sm leading-6 text-muted-foreground whitespace-pre-wrap">
              {project.description}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">No description provided.</p>
          )}
          <p className="text-xs text-muted-foreground">
            Created{" "}
            <time dateTime={project.createdAt.toISOString()}>
              {project.createdAt.toLocaleDateString()}
            </time>
          </p>
        </div>
      </section>

      {project.issues.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No issues in this project</CardTitle>
            <CardDescription>
              No issues are assigned to this project yet.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <section aria-label="Project issues">
          <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <table className="w-full table-fixed text-sm">
              <caption className="sr-only">Issues in {project.name}</caption>
              <thead className="border-b bg-muted/50 text-left text-xs text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Issue
                  </th>
                  <th scope="col" className="hidden w-36 px-4 py-3 font-medium sm:table-cell">
                    Status
                  </th>
                  <th scope="col" className="hidden w-28 px-4 py-3 font-medium sm:table-cell">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody>
                {project.issues.map((issue) => (
                  <tr
                    key={issue.id}
                    className="border-b last:border-b-0 transition-colors hover:bg-muted/40"
                  >
                    <td className="min-w-0 px-4 py-3">
                      <Link
                        href={`/issues/${issue.id}`}
                        className="block space-y-1 outline-none focus-visible:underline"
                      >
                        <div className="flex min-w-0 items-baseline gap-2">
                          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                            #{issue.id}
                          </span>
                          <span className="truncate font-medium text-foreground">
                            {issue.title}
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 sm:table-cell">
                      <span
                        className={cn(
                          "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
                          statusClassName(issue.status)
                        )}
                      >
                        {formatLabel(issue.status)}
                      </span>
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 sm:table-cell">
                      <span
                        className={cn(
                          "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
                          priorityClassName(issue.priority)
                        )}
                      >
                        {formatLabel(issue.priority)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
