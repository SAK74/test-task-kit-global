import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, FormField } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type PostFormType } from "@/schema";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CustomFormItem } from "./FormItem";
import { Textarea } from "./ui/textarea";

export const PostForm: FC<{ initial?: PostFormType }> = ({ initial }) => {
  const defaultValues = initial ?? { title: "", content: "" };
  const form = useForm({ resolver: zodResolver(postSchema), defaultValues });

  const onValid: SubmitHandler<PostFormType> = (data) => {
    console.log({ data });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValid)}
        className="flex flex-col gap-4"
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
        <div className="self-end space-x-3">
          <Button
            type="button"
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              form.reset();
            }}
          >
            Reset
          </Button>
          <Button type="submit" variant={"outline"} size={"sm"}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
