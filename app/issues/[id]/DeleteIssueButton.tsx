import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deleteIssue } from "../actions";

export default function DeleteIssueButton({ id }: { id: number }) {
    return (
        <Dialog>
            <DialogTrigger render={<Button variant="destructive" size="sm" />}>
                Delete
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Issue</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this issue?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <form action={deleteIssue.bind(null, id)}>
                        <Button type="submit" variant="destructive" size="sm">
                            Delete
                        </Button>
                    </form>
                    <DialogClose render={<Button type="button" variant="outline" size="sm" />}>Cancel</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}