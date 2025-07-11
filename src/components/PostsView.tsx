import { use, type FC } from "react";
import { SinglePost } from "./Post";
import type { Post } from "@/firebase";

export const PostsView: FC<{ posts: Promise<Post[]> }> = ({ posts }) => {
  const renderPOsts = use(posts);
  return (
    <div className="flex gap-4 flex-wrap">
      {renderPOsts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
};
