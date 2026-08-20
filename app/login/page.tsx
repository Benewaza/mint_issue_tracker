import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { login } from "./actions";


const LoginPage = () => {
    return (
        <div className="space-y-8">
            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
                    <p className="text-sm text-muted-foreground">
                        Log in to your account
                    </p>
                </div>
            </section>
            <section>
                <Card className="w-full max-w-md">
                    <CardContent>
                        <Form action={login}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="title">Email Address</FieldLabel>
                                    <Input type="email" name="email" placeholder="Enter Email Address" />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="description">Password</FieldLabel>
                                    <Input type="password" name="password" placeholder="Enter Password" />
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

export default LoginPage;