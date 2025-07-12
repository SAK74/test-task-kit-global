import { type FC } from "react";
import { SinglePost } from "./Post";
import { useTypedSelector } from "@/store";
import { selectAllPosts } from "@/store/posts.slice";
import { Spinner } from "./Spinner";
import { cn } from "@/lib/utils";
import type { Post } from "@/schema";

// const fakePosts: Post[] = [
//   {
//     title: "My new title",
//     content: "Some new content",
//     id: "EN7xBwgFZ7Vr0UoTJByV",
//   },

//   {
//     content: "Some new content",
//     title: "My new title",
//     id: "divxjdv9EP8HvvTrHfpm",
//   },
//   {
//     content: "Some new content",
//     title: "My new title",
//     id: "ks5LahmDnBMB1j7UVWne",
//   },
// ];

export const PostsView: FC<{ posts?: Promise<Post[]>; className?: string }> = ({
  className,
}) => {
  //   const renderPosts = use(posts);
  // const renderedPosts = fakePosts;
  const { status, error } = useTypedSelector((state) => state.posts);
  const renderedPosts = useTypedSelector(selectAllPosts);
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {status === "pending" && <Spinner />}
      {error}
      {renderedPosts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
};
