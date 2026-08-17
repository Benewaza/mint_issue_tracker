// Types for issues

export const STATUSES = ["OPEN", "CLOSED", "IN_PROGRESS"] as const;
export const PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;

export type Priority = (typeof PRIORITIES)[number];
export type Status = (typeof STATUSES)[number];

export type Issue = {
    id: number;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    createdAt: Date;
    updatedAt: Date;
}

// Create or update issue inputs
export type CreateUpdateIssueInput = {
    title: string;
    description: string;
    status?: Status;
    priority?: Priority;
}

export type UpdateIssueInput = Partial<CreateUpdateIssueInput>

export function formatLabel(value: string) {
    return value
        .toLowerCase()
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
}

export function statusClassName(status: Status) {
    switch (status) {
        case "OPEN":
            return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
        case "IN_PROGRESS":
            return "bg-amber-500/10 text-amber-700 dark:text-amber-400"
        case "CLOSED":
            return "bg-muted text-muted-foreground"
    }
}

export function priorityClassName(priority: Priority) {
    switch (priority) {
        case "HIGH":
            return "bg-red-500/10 text-red-700 dark:text-red-400"
        case "MEDIUM":
            return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
        case "LOW":
            return "bg-slate-500/10 text-slate-600 dark:text-slate-300"
    }
}