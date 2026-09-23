import Form from "next/form"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { requireUser } from "@/lib/auth-guard"
import { prisma } from "@/lib/prisma"
import { updateProject } from "../../actions"

type Props = {
    params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: Props) {
    await requireUser()

    const { id } = await params

    if (isNaN(Number(id))) notFound()

    const project = await prisma.project.findUnique({
        where: { id: Number(id) },
    })

    if (!project) notFound()

    return (
        <div className="space-y-8">
            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">Edit project</h1>
                    <p className="text-sm text-muted-foreground">
                        Update the name and description of this project.
                    </p>
                </div>
                <Button size="sm" render={<Link href={`/projects/${project.id}`} />} nativeButton={false}>
                    Cancel
                </Button>
            </section>
            <section>
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Project</CardTitle>
                        <CardDescription>
                            Give it a name and a short description of the work.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form action={updateProject}>
                            <input type="hidden" name="id" value={project.id} />
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Enter project name"
                                        defaultValue={project.name}
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        placeholder="Enter a description"
                                        defaultValue={project.description}
                                    />
                                </Field>
                                <Button type="submit">Submit</Button>
                            </FieldGroup>
                        </Form>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
