"use server"

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"

export async function login(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/issues",
        })
    } catch (error) {
        if (error instanceof AuthError) {
            throw new Error("Invalid email or password")
        }
        throw error
    }
}

export async function logout() {
    await signOut({ redirectTo: "/issues" })
}