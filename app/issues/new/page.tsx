import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PRIORITIES, STATUSES, formatLabel } from "@/lib/issues";
import { requireUser } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { createIssue } from "../actions";


export default async function NewIssuePage() {
    await requireUser();

    const projects = await prisma.project.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true },
    });

    return (
        <div className="space-y-8">
            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">Add new issue</h1>
                    <p className="text-sm text-muted-foreground">
                        Track open work, priorities, and progress across your project.
                    </p>
                </div>
            </section>
            <section>
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Bug Report</CardTitle>
                        <CardDescription>
                            Help us improve by reporting bugs you encounter.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form action={createIssue}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="title">Bug Title</FieldLabel>
                                    <Input type="text" name="title" placeholder="Enter text" />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <Textarea name="description" placeholder="Enter description of issue" />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="priority">Priority</FieldLabel>
                                    <Select name="priority">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PRIORITIES.map((priority) => (
                                                <SelectItem key={priority} value={priority}>
                                                    {formatLabel(priority)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="status">Status</FieldLabel>
                                    <Select name="status">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {STATUSES.map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {formatLabel(status)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="projectId">Project</FieldLabel>
                                    <Select
                                        name="projectId"
                                        defaultValue="none"
                                        items={{
                                            none: "No project",
                                            ...Object.fromEntries(
                                                projects.map((project) => [String(project.id), project.name])
                                            ),
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="No project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">No project</SelectItem>
                                            {projects.map((project) => (
                                                <SelectItem key={project.id} value={String(project.id)}>
                                                    {project.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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