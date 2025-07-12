import { type FC } from "react";
import { SinglePost } from "./Post";
import type { Post } from "@/firebase";
import { useTypedSelector } from "@/store";
import { selectAllPosts } from "@/store/posts.slice";
import { Spinner } from "./Spinner";
import { cn } from "@/lib/utils";

// const fakePosts: Post[] = [
//   {
//     title: "My new title",
//     content: "Some new content",
//     // timestamp: { seconds: 1000, nanoseconds: 2000 },
//     id: "EN7xBwgFZ7Vr0UoTJByV",
//   },

//   { title: "example 2", id: "OlCw2gGVPPoXjHWjAxfy" },

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

//   { title: "example 1", id: "naLHYbm3ykJfd7B484ol" },
// ];

export const PostsView: FC<{ posts?: Promise<Post[]>; className?: string }> = ({
  className,
}) => {
  //   const renderPosts = use(posts);
  //   const renderedPosts=fakePosts
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
