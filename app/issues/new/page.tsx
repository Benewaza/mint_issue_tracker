import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PRIORITIES, formatLabel } from "@/lib/issues";
import { createIssue } from "../actions";


const NewIssuePage = () => {
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

                                <Button type="submit">Submit</Button>

                            </FieldGroup>
                        </Form>
                    </CardContent>
                </Card>
            </section>
        </div>

    )
}

export default NewIssuePage;