"use server";

import { prisma } from "@/lib/prisma";
import { PRIORITIES, STATUSES, type Priority, type CreateUpdateIssueInput, type Status } from "@/lib/issues";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createIssue = async (formData: FormData) => {

    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const priorityValue = String(formData.get("priority") ?? "");
    const statusValue = String(formData.get("status") ?? "");

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
    }

    await prisma.issue.create({ data });

    revalidatePath("/issues")
    redirect("/issues")
};

export const updateIssue = async (formData: FormData) => {

    const id = String(formData.get("id") ?? "");
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const priorityValue = String(formData.get("priority") ?? "");
    const statusValue = String(formData.get("status") ?? "");

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

    const data: CreateUpdateIssueInput = {
        title,
        description: description || "",
        priority: priorityValue as Priority,
        status: statusValue as Status,
    }

    await prisma.issue.update({ where: { id: Number(id) }, data });

    revalidatePath("/issues")
    revalidatePath(`/issues/${id}`)
    redirect(`/issues/${id}`)
};