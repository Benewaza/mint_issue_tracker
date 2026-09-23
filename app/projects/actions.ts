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

export const updateProject = async (formData: FormData) => {
    await requireUser()

    const id = String(formData.get("id") ?? "")
    const name = String(formData.get("name") ?? "").trim()
    const description = String(formData.get("description") ?? "").trim()

    if (!id) {
        throw new Error("ID is required")
    }

    if (isNaN(Number(id)) || Number(id) <= 0) {
        throw new Error("Invalid ID")
    }

    if (!name) {
        throw new Error("Name is required")
    }

    const data: CreateUpdateProjectInput = {
        name,
        description: description || "",
    }

    await prisma.project.update({ where: { id: Number(id) }, data })

    revalidatePath("/projects")
    revalidatePath(`/projects/${id}`)
    redirect(`/projects/${id}`)
}

export const deleteProject = async (id: number) => {
    await requireUser()

    if (isNaN(id) || id <= 0) {
        throw new Error("Invalid ID")
    }

    await prisma.project.delete({ where: { id } })

    revalidatePath("/projects")
    revalidatePath(`/projects/${id}`)
    revalidatePath("/issues")
    redirect("/projects")
}
