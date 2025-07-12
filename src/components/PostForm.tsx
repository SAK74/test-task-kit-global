import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, FormField } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type PostFormType } from "@/schema";
import { Input } from "./ui/input";
import { CustomFormItem } from "./FormItem";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { useTypedDispatch } from "@/store";
import { addPostAction } from "@/store/posts.slice";

export const PostForm: FC<{
  initial?: PostFormType;
  className?: string;
  ControllPanel: FC<{ onReset: () => void }>;
  closeWindow: () => void;
}> = ({ initial, className, ControllPanel, closeWindow }) => {
  const defaultValues = initial ?? { title: "", content: "" };
  const form = useForm({ resolver: zodResolver(postSchema), defaultValues });

  const dispatch = useTypedDispatch();
  const onValid: SubmitHandler<PostFormType> = (data) => {
    dispatch(addPostAction(data));
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
