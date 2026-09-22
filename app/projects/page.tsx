import Link from "next/link"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ProjectsPage() {
    const session = await auth()
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            _count: { select: { issues: true } },
        },
    })

    return (
        <div className="space-y-8">
            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
                    <p className="text-sm text-muted-foreground">
                        Group issues by the work they belong to.
                    </p>
                </div>
                {session?.user ? (
                    <Button render={<Link href="/projects/new" />} nativeButton={false} size="sm">
                        New Project
                    </Button>
                ) : null}
            </section>

            {projects.length === 0 ? (
                <section aria-label="Empty projects list">
                    <Card>
                        <CardHeader>
                            <CardTitle>No projects yet</CardTitle>
                            <CardDescription>
                                Projects group related issues. None have been created yet.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {session?.user ? (
                                <Button render={<Link href="/projects/new" />} nativeButton={false}>
                                    Create project
                                </Button>
                            ) : (
                                <Button render={<Link href="/login" />} nativeButton={false}>
                                    Sign in to create a project
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </section>
            ) : (
                <section aria-label="Project list">
                    <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
                        <table className="w-full table-fixed text-sm">
                            <caption className="sr-only">Projects</caption>
                            <thead className="border-b bg-muted/50 text-left text-xs text-muted-foreground">
                                <tr>
                                    <th scope="col" className="px-4 py-3 font-medium">
                                        Project
                                    </th>
                                    <th scope="col" className="hidden w-28 px-4 py-3 font-medium sm:table-cell">
                                        Issues
                                    </th>
                                    <th scope="col" className="hidden w-28 px-4 py-3 font-medium md:table-cell">
                                        Created
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="border-b last:border-b-0 transition-colors hover:bg-muted/40"
                                    >
                                        <td className="min-w-0 px-4 py-3">
                                            <Link
                                                href={`/projects/${project.id}`}
                                                className="block space-y-1 outline-none focus-visible:underline"
                                            >
                                                <p className="truncate font-medium text-foreground">
                                                    {project.name}
                                                </p>
                                                {project.description ? (
                                                    <p className="line-clamp-1 text-xs text-muted-foreground">
                                                        {project.description}
                                                    </p>
                                                ) : null}
                                            </Link>
                                        </td>
                                        <td className="hidden px-4 py-3 tabular-nums text-muted-foreground sm:table-cell">
                                            {project._count.issues}
                                        </td>
                                        <td className="hidden whitespace-nowrap px-4 py-3 text-xs text-muted-foreground md:table-cell">
                                            <time dateTime={project.createdAt.toISOString()}>
                                                {project.createdAt.toLocaleDateString()}
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
