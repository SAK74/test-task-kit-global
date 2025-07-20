import { CirclePlusIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { PostForm } from "./PostForm";
import { useState } from "react";
import { addPostAction } from "@/store/posts.slice";
import { useTypedDispatch } from "@/store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/auth";

export const AddPost = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useTypedDispatch();
  const [user] = useAuthState(auth);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button disabled={!user}>
          <CirclePlusIcon />
          Post
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-10/12 mx-auto px-8 pb-4">
        <DrawerHeader className="relative">
          <DrawerTitle>Create a new post</DrawerTitle>
          <Button
            variant={"outline"}
            className="absolute top-2 right-2"
            onClick={() => {
              setOpen(false);
            }}
          >
            <XIcon color="red" />
          </Button>
        </DrawerHeader>
        <PostForm
          className="w-10/12 mx-auto"
          closeWindow={() => {
            setOpen(false);
          }}
          ControllPanel={({ onReset }) => (
            <DrawerFooter className="self-end flex-row">
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
            </DrawerFooter>
          )}
          onSubmit={(post) => {
            dispatch(addPostAction(post));
          }}
        />
      </DrawerContent>
    </Drawer>
  );
};
