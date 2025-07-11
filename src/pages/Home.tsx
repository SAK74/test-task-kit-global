import { PostsView } from "@/components/PostsView";
import { Spinner } from "@/components/Spinner";
import { addPost, getPosts } from "@/firebase";
import { Suspense, useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    getPosts().then((posts) => {
      console.log({ posts });
    });
  }, []);

  const handleClick = async () => {
    const res = await addPost({
      title: "My new title",
      content: "Some new content",
    });
    console.log("Add post: ", res);
  };
  return (
    <>
      <h1>Main view</h1>
      <button onClick={handleClick}>Add post</button>
      <Suspense fallback={<Spinner />}>
        <PostsView posts={getPosts()} />
      </Suspense>
    </>
  );
};
