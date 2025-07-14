import { AddPost } from "@/components/AddPost";
import { FilterPanel } from "@/components/FilterPanel";
import { FilterProvider } from "@/components/FilterProvider";
import { PostsView } from "@/components/PostsView";
import { SortPanel } from "@/components/SortPanel";
import { SortProvider } from "@/components/SortProvider";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/firebase/auth";
import { useTypedDispatch } from "@/store";
import { initiate } from "@/store/posts.slice";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const Home = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(initiate());
  }, [dispatch]);

  const [user] = useAuthState(auth);

  return (
    <main className="">
      <h1>Posts</h1>
      <SortProvider>
        <FilterProvider>
          <div className="flex gap-6">
            <Card className="px-4 w-1/4">
              <CardHeader>
                <CardTitle className="italic font-light">
                  {user?.email}
                </CardTitle>
              </CardHeader>
              <AddPost />
              <SortPanel />
              <FilterPanel />
            </Card>
            <PostsView className="grow" />
          </div>
        </FilterProvider>
      </SortProvider>
    </main>
  );
};
