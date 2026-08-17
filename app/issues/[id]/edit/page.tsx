import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PRIORITIES, STATUSES, formatLabel } from "@/lib/issues";
import Form from "next/form";
import { updateIssue } from "../../actions";
import Link from "next/link";

type Props = {
    params: Promise<{ id: string }>;
}

export default async function EditIssuePage({ params }: Props) {

    const { id } = await params;

    if (isNaN(Number(id))) notFound();

    const issue = await prisma.issue.findUnique({
        where: { id: Number(id) }
    })

    if (!issue) notFound();

    return (
        <div className="space-y-8">
            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">Edit issue</h1>
                    <p className="text-sm text-muted-foreground">
                        Edit the details of the issue.
                    </p>
                </div>

                <Button size="sm" render={<Link href={`/issues/${issue.id}`} />} nativeButton={false}>
                    Cancel
                </Button>
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
                        <Form action={updateIssue}>
                            <input type="hidden" name="id" value={issue.id} />
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="title">Bug Title</FieldLabel>
                                    <Input type="text" name="title" placeholder="Enter text" defaultValue={issue.title} />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <Textarea name="description" placeholder="Enter description of issue" defaultValue={issue.description} />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="priority">Priority</FieldLabel>
                                    <Select name="priority" defaultValue={issue.priority}>
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
                                    <Select name="status" defaultValue={issue.status}>
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

                                <Button type="submit">Submit</Button>

                            </FieldGroup>
                        </Form>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}