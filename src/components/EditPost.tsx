import { SquarePenIcon } from "lucide-react";
import { Button } from "./ui/button";
import { PostForm } from "./PostForm";
import { useState, type FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import type { Post } from "@/schema";
import { useTypedDispatch } from "@/store";
import { updatePostAction } from "@/store/posts.slice";

export const EditPost: FC<{ post: Post }> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useTypedDispatch();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <SquarePenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-10/12 mx-auto px-8 pb-4">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
        </DialogHeader>
        <PostForm
          className="w-10/12 mx-auto"
          closeWindow={() => {
            setOpen(false);
          }}
          ControllPanel={({ onReset }) => (
            <DialogFooter className="self-end flex-row">
              <Button
                type="button"
                variant={"outline"}
                size={"sm"}
                onClick={() => {
                  onReset();
                }}
              >
                Reset
              </Button>
              <Button type="submit" variant={"outline"} size={"sm"}>
                Submit
              </Button>
            </DialogFooter>
          )}
          initial={post}
          onSubmit={(post) => {
            const { id, ...data } = post;
            dispatch(updatePostAction({ id, data }));
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
