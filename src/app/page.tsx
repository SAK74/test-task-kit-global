"use client";

import { AddPost } from "@/components/AddPost";
import { FilterPanel } from "@/components/FilterPanel";
import { FilterProvider } from "@/components/FilterProvider";
import { PostsView } from "@/components/PostsView";
import { SortPanel } from "@/components/SortPanel";
import { SortProvider } from "@/components/SortProvider";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useTypedDispatch } from "@/store";
import { initiate } from "@/store/posts.slice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(initiate());
  }, [dispatch]);

  const { data } = useSession();

  return (
    <main className="">
      <h1>Posts</h1>
      <SortProvider>
        <FilterProvider>
          <div className="flex gap-6">
            <Card className="px-4 w-1/4">
              <CardHeader>
                <CardTitle className="italic font-light">
                  {data?.user?.email}
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
}
