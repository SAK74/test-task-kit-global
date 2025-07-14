import { type FC } from "react";
import { SinglePost } from "./Post";
import { useTypedSelector } from "@/store";
import { selectAllPosts } from "@/store/posts.slice";
import { Spinner } from "./Spinner";
import { cn } from "@/lib/utils";
import type { Post } from "@/schema";
import { useSortCtx } from "./SortProvider";
import { useFilterCtx } from "./FilterProvider";

export const PostsView: FC<{ posts?: Promise<Post[]>; className?: string }> = ({
  className,
}) => {
  // const renderedPosts = fakePosts;
  const { status, error } = useTypedSelector((state) => state.posts);
  const renderedPosts = useTypedSelector(selectAllPosts);

  const { sortBy, sortDir } = useSortCtx();
  const sortFn = (a: Post, b: Post) => {
    switch (sortBy) {
      case "title":
        return sortDir === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      case "date":
        return sortDir === "asc"
          ? (a.timestamp ?? 0) - (b.timestamp ?? 0)
          : (b.timestamp ?? 0) - (a.timestamp ?? 0);
      case "author":
        return sortDir === "asc"
          ? (a.author ?? "").localeCompare(b.author ?? "")
          : (b.author ?? "").localeCompare(a.author ?? "");
      default:
        return 0;
    }
  };

  const { filterByAuthor, authorValue, filterByContent, contentValue } =
    useFilterCtx();

  const filterFn = (post: Post) => {
    if (filterByAuthor && authorValue) {
      return post.author?.toLowerCase().includes(authorValue.toLowerCase());
    }
    if (filterByContent && contentValue) {
      return post.content.toLowerCase().includes(contentValue.toLowerCase());
    }
    return true;
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {status === "pending" && <Spinner />}
      {error && <div className="text-destructive">{error}</div>}
      {renderedPosts
        .filter(filterFn)
        .sort(sortFn)
        .map((post) => (
          <SinglePost key={post.id} post={post} />
        ))}
    </div>
  );
};
