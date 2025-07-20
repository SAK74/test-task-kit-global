import {
  useState,
  type FC,
  type FormEventHandler,
  type PropsWithChildren,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import type { Post } from "@/schema";
import { Input } from "./ui/input";

export const CommentPost: FC<
  PropsWithChildren<{
    id: Post["id"];
    onSubmit: (id: Post["id"], comment: string) => void;
  }>
> = ({ id, children, onSubmit }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const comment = (ev.currentTarget["comment"] as HTMLInputElement).value;
    onSubmit(id, comment);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-10/12 mx-auto px-8 pb-4">
        <DialogHeader>
          <DialogTitle>Comment the post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input name="comment" />
        </form>
      </DialogContent>
    </Dialog>
  );
};
