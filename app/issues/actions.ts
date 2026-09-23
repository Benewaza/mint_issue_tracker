"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-guard";
import { PRIORITIES, STATUSES, type Priority, type CreateUpdateIssueInput, type Status } from "@/lib/issues";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function parseProjectId(formData: FormData) {
    const raw = String(formData.get("projectId") ?? "").trim();

    if (!raw || raw === "none") {
        return null;
    }

    const projectId = Number(raw);

    if (isNaN(projectId) || projectId <= 0) {
        throw new Error("Please select a valid project");
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { id: true },
    });

    if (!project) {
        throw new Error("Please select a valid project");
    }

    return projectId;
}

function revalidateProjectPaths(projectId: number | null) {
    revalidatePath("/projects");

    if (projectId) {
        revalidatePath(`/projects/${projectId}`);
    }
}

export const createIssue = async (formData: FormData) => {
    await requireUser();

    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const priorityValue = String(formData.get("priority") ?? "");
    const statusValue = String(formData.get("status") ?? "");
    const projectId = await parseProjectId(formData);

    if (!title) {
        throw new Error("Title is required");
    }

    if (!PRIORITIES.includes(priorityValue as Priority)) {
        throw new Error("Please select a valid priority");
    }

    if (!STATUSES.includes(statusValue as Status)) {
        throw new Error("Please select a valid status");
    }


    const data: CreateUpdateIssueInput = {
        title,
        description: description || "",
        priority: priorityValue as Priority,
        status: statusValue as Status,
        projectId,
    }

    await prisma.issue.create({ data });

    revalidatePath("/issues")
    revalidateProjectPaths(projectId)
    redirect("/issues")
};

export const updateIssue = async (formData: FormData) => {
    await requireUser();

    const id = String(formData.get("id") ?? "");
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const priorityValue = String(formData.get("priority") ?? "");
    const statusValue = String(formData.get("status") ?? "");
    const projectId = await parseProjectId(formData);

    if (!id) {
        throw new Error("ID is required");
    }

    if (isNaN(Number(id)) || Number(id) <= 0) {
        throw new Error("Invalid ID");
    }

    if (!title) {
        throw new Error("Title is required");
    }

    if (!PRIORITIES.includes(priorityValue as Priority)) {
        throw new Error("Please select a valid priority");
    }

    if (!STATUSES.includes(statusValue as Status)) {
        throw new Error("Please select a valid status");
    }

    const existing = await prisma.issue.findUnique({
        where: { id: Number(id) },
        select: { projectId: true },
    });

    if (!existing) {
        throw new Error("Issue not found");
    }

    const data: CreateUpdateIssueInput = {
        title,
        description: description || "",
        priority: priorityValue as Priority,
        status: statusValue as Status,
        projectId,
    }

    await prisma.issue.update({ where: { id: Number(id) }, data });

    revalidatePath("/issues")
    revalidatePath(`/issues/${id}`)
    revalidateProjectPaths(existing.projectId)
    revalidateProjectPaths(projectId)
    redirect(`/issues/${id}`)
};

export const deleteIssue = async (id: number) => {
    await requireUser();

    if (isNaN(id) || id <= 0) {
        throw new Error("Invalid ID");
    }

    const existing = await prisma.issue.findUnique({
        where: { id },
        select: { projectId: true },
    });

    if (!existing) {
        throw new Error("Issue not found");
    }

    await prisma.issue.delete({ where: { id } });

    revalidatePath("/issues");
    revalidateProjectPaths(existing.projectId);
    redirect("/issues");

}