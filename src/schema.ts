import z from "zod";

export const postSchema = z.object({
  title: z.string().trim().nonempty("Title is required"),
  content: z.string().trim().nonempty("Fill some content"),
});

export type PostFormType = z.infer<typeof postSchema>;

export type Post = PostFormType & {
  id: string;
  timestamp?: number;
};
