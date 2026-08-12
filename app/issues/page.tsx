import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { formatLabel } from "@/lib/issues"


export default async function IssuesPage() {

    const issues = await prisma.issue.findMany({
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

            {issues.length === 0 ? (
                <section aria-label="Empty issues list">
                    <Card>
                        <CardHeader>
                            <CardTitle>No issues yet</CardTitle>
                            <CardDescription>
                                Create your first issue to start tracking bugs, tasks, and
                                improvements.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button render={<Link href="/issues/new" />} nativeButton={false}>
                                Create issue
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            ) : (
                <section aria-label="Issue list">
                    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {issues.map((issue) => (
                            <li key={issue.id}>
                                <article className="h-full">
                                    <Card size="sm" className="h-full">
                                        <CardHeader>
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground justify-between mb-2">
                                                <span className="rounded-md bg-muted px-2 py-0.5 font-medium text-foreground">
                                                    {formatLabel(issue.status)}
                                                </span>
                                                <span className="rounded-md border px-2 py-0.5">
                                                    {formatLabel(issue.priority)}
                                                </span>
                                            </div>
                                            <CardTitle className="text-base leading-snug">
                                                {issue.title}
                                            </CardTitle>
                                            {issue.description ? (
                                                <CardDescription className="line-clamp-3">
                                                    {issue.description}
                                                </CardDescription>
                                            ) : null}
                                        </CardHeader>
                                        <CardContent>
                                            <time
                                                dateTime={issue.createdAt.toISOString()}
                                                className="text-xs text-muted-foreground"
                                            >
                                                Opened {issue.createdAt.toLocaleDateString()}
                                            </time>
                                        </CardContent>
                                    </Card>
                                </article>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    )
}
