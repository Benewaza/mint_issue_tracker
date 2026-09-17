export type Project = {
    id: number
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
}

export type CreateUpdateProjectInput = {
    name: string
    description: string
}

export type UpdateProjectInput = Partial<CreateUpdateProjectInput>
