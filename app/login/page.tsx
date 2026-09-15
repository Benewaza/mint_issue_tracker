import Form from "next/form"
import { redirect } from "next/navigation"

import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { login } from "./actions"

export default async function LoginPage() {
    const session = await auth()

    if (session?.user) {
        redirect("/issues")
    }

    return (
        <div className="space-y-8">
            <section className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
                <p className="text-sm text-muted-foreground">
                    Sign in to create, edit, and delete issues.
                </p>
            </section>
            <section>
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Sign in</CardTitle>
                        <CardDescription>
                            Use your account email and password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form action={login}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                                    <Input id="email" type="email" name="email" placeholder="Enter email address" required />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input id="password" type="password" name="password" placeholder="Enter password" required />
                                </Field>
                                <Button type="submit">Sign in</Button>
                            </FieldGroup>
                        </Form>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
