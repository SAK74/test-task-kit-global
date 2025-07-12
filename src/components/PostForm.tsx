import type { Post } from "@/firebase";
import type { FC } from "react";
import { Form, useForm } from "react-hook-form";

export const PostForm: FC<{ initial?: Post }> = ({ initial }) => {
  const form = useForm({ defaultValues: initial });
  return (
    <Form>
      <form></form>
    </Form>
  );
};
