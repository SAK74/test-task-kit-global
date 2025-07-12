import { AddForm } from "@/components/AddForm";
import { FilterPanel } from "@/components/FilterPanel";
import { FilterProvider } from "@/components/FilterProvider";
import { PostsView } from "@/components/PostsView";
import { SortPanel } from "@/components/SortPanel";
import { SortProvider } from "@/components/SortProvider";
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
    <main className="">
      <h1>Posts</h1>
      <SortProvider>
        <FilterProvider>
          <div className="flex gap-6">
            <Card className="px-4 w-1/4">
              <AddForm />
              <SortPanel />
              <FilterPanel />
            </Card>
            {/* <Suspense fallback={<Spinner />}> */}
            <PostsView className="grow" />
            {/* </Suspense> */}
          </div>
        </FilterProvider>
      </SortProvider>
    </main>
  );
};
