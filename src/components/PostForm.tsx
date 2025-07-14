import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, FormField } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type Post, type PostFormType } from "@/schema";
import { Input } from "./ui/input";
import { CustomFormItem } from "./FormItem";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/auth";

export const PostForm: FC<{
  initial?: Post;
  className?: string;
  ControllPanel: FC<{ onReset: () => void }>;
  closeWindow: () => void;
  onSubmit: (post: PostFormType & { id: Post["id"] }) => void;
}> = ({ initial, className, ControllPanel, closeWindow, onSubmit }) => {
  const defaultValues = initial ?? { title: "", content: "" };
  const form = useForm({ resolver: zodResolver(postSchema), defaultValues });

  const [user] = useAuthState(auth);

  const onValid: SubmitHandler<PostFormType> = (data) => {
    if (initial) {
      onSubmit({ ...data, id: initial.id });
    } else {
      onSubmit({ ...data, author: user?.email } as Post);
    }
    closeWindow();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValid)}
        className={cn("flex flex-col gap-4", className)}
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <CustomFormItem
              Element={Input}
              inputProps={{ ...field, placeholder: "Post title" }}
            />
          )}
        />
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <CustomFormItem
              Element={Textarea}
              inputProps={{ ...field, placeholder: "Some content" }}
            />
          )}
        />
        <ControllPanel onReset={form.reset} />
      </form>
    </Form>
  );
};
