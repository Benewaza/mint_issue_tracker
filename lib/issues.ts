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
export type CreateIssueInput = {
    title: string;
    description: string;
    status?: Status;
    priority?: Priority;
}

export type UpdateIssueInput = Partial<CreateIssueInput>

export function formatLabel(value: string) {
    return value
        .toLowerCase()
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
}