"use server";

import { prisma } from "@/lib/prisma";
import { PRIORITIES, type Priority, type CreateIssueInput } from "@/lib/issues";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createIssue = async (formData: FormData) => {

    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const priorityValue = String(formData.get("priority") ?? "");
    console.log(priorityValue);

    if (!title) {
        throw new Error("Title is required");
    }

    if (!PRIORITIES.includes(priorityValue as Priority)) {
        throw new Error("Please select a valid priority");
    }

    const data: CreateIssueInput = {
        title,
        description: description || "",
        priority: priorityValue as Priority,
        status: "OPEN"
    }

    await prisma.issue.create({ data });

    revalidatePath("/issues")
    redirect("/issues")
};