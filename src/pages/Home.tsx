import { PostsView } from "@/components/PostsView";
import { useTypedDispatch } from "@/store";
import { addPostAction, initiate } from "@/store/posts.slice";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(initiate());
  }, [dispatch]);

  const handleClick = async () => {
    dispatch(
      addPostAction({
        title: "My new title",
        content: "Some new content",
      })
    );
  };
  return (
    <div className="">
      <h1>Main view</h1>
      <button onClick={handleClick}>Add post</button>
      <div className="flex gap-6">
        <aside className="px-4 w-1/4">Control</aside>
        {/* <Suspense fallback={<Spinner />}> */}
        <PostsView className="grow" />
        {/* </Suspense> */}
      </div>
    </div>
  );
};
