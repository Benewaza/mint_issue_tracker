import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { formatLabel, STATUSES, Status, PRIORITIES, Priority, priorityClassName, statusClassName, } from "@/lib/issues"
import { cn } from "@/lib/utils"

type Props = {
    searchParams: Promise<{ status?: string; priority?: string }>
}

function issuesHref(filters: { status?: Status; priority?: Priority }) {
    const params = new URLSearchParams()
    if (filters.status) params.set("status", filters.status)
    if (filters.priority) params.set("priority", filters.priority)
    const query = params.toString()
    return query ? `/issues?${query}` : "/issues"
}

export default async function IssuesPage({ searchParams }: Props) {

    const { status, priority } = await searchParams

    const statusFilter = STATUSES.includes(status as Status) ? (status as Status) : undefined
    const priorityFilter = PRIORITIES.includes(priority as Priority) ? (priority as Priority) : undefined

    const hasFilters = Boolean(statusFilter || priorityFilter)

    const issues = await prisma.issue.findMany({
        where: {
            ...(statusFilter ? { status: statusFilter } : {}),
            ...(priorityFilter ? { priority: priorityFilter } : {}),
        },
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="space-y-8">
            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">Issues</h1>
                    <p className="text-sm text-muted-foreground">
                        Track open work, priorities, and progress across your project.
                    </p>
                </div>
                <Button render={<Link href="/issues/new" />} nativeButton={false} size="sm">
                    New Issue
                </Button>
            </section>

            <section aria-label="Filter issues" className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Status</span>
                    <Link
                        href={issuesHref({ priority: priorityFilter })}
                        className={cn(
                            "rounded-md px-2 py-0.5 text-xs font-medium",
                            !statusFilter
                                ? "bg-foreground text-background"
                                : "bg-muted text-muted-foreground hover:text-foreground"
                        )}
                    >
                        All
                    </Link>
                    {STATUSES.map((value) => (
                        <Link
                            key={value}
                            href={issuesHref({
                                status: statusFilter === value ? undefined : value,
                                priority: priorityFilter,
                            })}
                            className={cn(
                                "rounded-md px-2 py-0.5 text-xs font-medium",
                                statusFilter === value
                                    ? statusClassName(value)
                                    : "bg-muted text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {formatLabel(value)}
                        </Link>
                    ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Priority</span>
                    <Link
                        href={issuesHref({ status: statusFilter })}
                        className={cn(
                            "rounded-md px-2 py-0.5 text-xs font-medium",
                            !priorityFilter
                                ? "bg-foreground text-background"
                                : "bg-muted text-muted-foreground hover:text-foreground"
                        )}>
                        All
                    </Link>
                    {PRIORITIES.map((value) => (
                        <Link key={value}
                            href={issuesHref({
                                status: statusFilter,
                                priority: priorityFilter === value ? undefined : value,
                            })}
                            className={cn(
                                "rounded-md px-2 py-0.5 text-xs font-medium",
                                priorityFilter === value
                                    ? priorityClassName(value)
                                    : "bg-muted text-muted-foreground hover:text-foreground"
                            )}>
                            {formatLabel(value)}
                        </Link>
                    ))}
                </div>
            </section>

            {issues.length === 0 ? (
                <section aria-label="Empty issues list">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {hasFilters ? "No matching issues" : "No issues yet"}
                            </CardTitle>
                            <CardDescription>
                                {hasFilters
                                    ? "Nothing matches these filters. Try another status or priority."
                                    : "Create your first issue to start tracking bugs, tasks, and improvements."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {hasFilters ? (
                                <Button
                                    variant="outline"
                                    render={<Link href="/issues" />}
                                    nativeButton={false}
                                >
                                    Clear filters
                                </Button>
                            ) : (
                                <Button render={<Link href="/issues/new" />} nativeButton={false}>
                                    Create issue
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </section>
            ) : (
                <section aria-label="Issue list">
                    <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
                        <table className="w-full text-sm">
                            <caption className="sr-only">Filtered issues</caption>
                            <thead className="border-b bg-muted/50 text-left text-xs text-muted-foreground">
                                <tr>
                                    <th scope="col" className="px-4 py-3 font-medium">
                                        Issue
                                    </th>
                                    <th scope="col" className="hidden px-4 py-3 font-medium sm:table-cell">
                                        Status
                                    </th>
                                    <th scope="col" className="hidden px-4 py-3 font-medium sm:table-cell">
                                        Priority
                                    </th>
                                    <th scope="col" className="hidden px-4 py-3 font-medium md:table-cell">
                                        Opened
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {issues.map((issue) => (
                                    <tr
                                        key={issue.id}
                                        className="border-b last:border-b-0 transition-colors hover:bg-muted/40"
                                    >
                                        <td className="px-4 py-3">
                                            <Link
                                                href={`/issues/${issue.id}`}
                                                className="block space-y-1 outline-none focus-visible:underline"
                                            >
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-xs tabular-nums text-muted-foreground">
                                                        #{issue.id}
                                                    </span>
                                                    <span className="font-medium text-foreground">
                                                        {issue.title}
                                                    </span>
                                                </div>
                                                {issue.description ? (
                                                    <p className="line-clamp-1 text-xs text-muted-foreground">
                                                        {issue.description}
                                                    </p>
                                                ) : null}
                                                <div className="flex flex-wrap gap-2 pt-1 sm:hidden">
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
                                            </Link>
                                        </td>
                                        <td className="hidden px-4 py-3 sm:table-cell">
                                            <span
                                                className={cn(
                                                    "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
                                                    statusClassName(issue.status)
                                                )}
                                            >
                                                {formatLabel(issue.status)}
                                            </span>
                                        </td>
                                        <td className="hidden px-4 py-3 sm:table-cell">
                                            <span
                                                className={cn(
                                                    "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
                                                    priorityClassName(issue.priority)
                                                )}
                                            >
                                                {formatLabel(issue.priority)}
                                            </span>
                                        </td>
                                        <td className="hidden px-4 py-3 md:table-cell">
                                            <time
                                                dateTime={issue.createdAt.toISOString()}
                                                className="text-xs text-muted-foreground"
                                            >
                                                {issue.createdAt.toLocaleDateString()}
                                            </time>
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
