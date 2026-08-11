// Types for issues
type Status = "OPEN" | "CLOSED" | "IN_PROGRESS";
type Priority = "LOW" | "MEDIUM" | "HIGH";

type Issue = {
    id: number;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    createdAt: Date;
    updatedAt: Date;
}

// Create or update issue inputs
type CreateIssueInput = {
    title: string;
    description?: string;
    status?: Status;
    priority?: Priority;
}

type UpdateIssueInput = Partial<CreateIssueInput>

export type { Status, Priority, Issue, CreateIssueInput, UpdateIssueInput }
