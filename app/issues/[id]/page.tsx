import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
type Props = {
    params: Promise<{ id: string }>
}

export default async function IssueDetailPage({ params }: Props) {

    const { id } = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: Number(id) },
    })

    if (!issue) {
        notFound();
    }

    return (
        <div>
            <h1>{issue.title}</h1>
            <p>{issue.description}</p>
            <p>{issue.priority}</p>
            <p>{issue.status}</p>
        </div>
    )
}
