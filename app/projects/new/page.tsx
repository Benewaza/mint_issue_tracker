import Form from "next/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { requireUser } from "@/lib/auth-guard"
import { createProject } from "../actions"

export default async function NewProjectPage() {
    await requireUser()

    return (
        <div className="space-y-8">
            <section className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">Add new project</h1>
                <p className="text-sm text-muted-foreground">
                    Create a project to group related issues.
                </p>
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
                        <Form action={createProject}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input id="name" type="text" name="name" placeholder="Enter project name" required />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <Textarea id="description" name="description" placeholder="Enter a description" />
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
