import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { deleteProject } from "../actions"

export default function DeleteProjectButton({ id }: { id: number }) {
    return (
        <Dialog>
            <DialogTrigger render={<Button variant="destructive" size="sm" />}>
                Delete
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Project</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this project? Issues in it will not be deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <form action={deleteProject.bind(null, id)}>
                        <Button type="submit" variant="destructive" size="sm">
                            Delete
                        </Button>
                    </form>
                    <DialogClose render={<Button type="button" variant="outline" size="sm" />}>
                        Cancel
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
