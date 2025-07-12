import { AddForm } from "@/components/AddForm";
import { PostsView } from "@/components/PostsView";
import { Card } from "@/components/ui/card";
import { useTypedDispatch } from "@/store";
import { initiate } from "@/store/posts.slice";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(initiate());
  }, [dispatch]);

  return (
    <div className="">
      <h1>Main view</h1>
      <div className="flex gap-6">
        <Card className="px-4 w-1/4">
          <AddForm />
        </Card>
        {/* <Suspense fallback={<Spinner />}> */}
        <PostsView className="grow" />
        {/* </Suspense> */}
      </div>
    </div>
  );
};
