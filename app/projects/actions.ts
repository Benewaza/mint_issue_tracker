"use server"

import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/auth-guard"
import type { CreateUpdateProjectInput } from "@/lib/projects"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createProject = async (formData: FormData) => {
    await requireUser()

    const name = String(formData.get("name") ?? "").trim()
    const description = String(formData.get("description") ?? "").trim()

    if (!name) {
        throw new Error("Name is required")
    }

    const data: CreateUpdateProjectInput = {
        name,
        description: description || "",
    }

    await prisma.project.create({ data })

    revalidatePath("/projects")
    redirect("/projects")
}
