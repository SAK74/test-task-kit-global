"use client";

import dynamic from "next/dynamic";
import { FC, use } from "react";
const PostDetails = dynamic(
  () => import("./PostDetails").then((m) => m.Details),
  { ssr: false }
);

export const Details: FC<{ postId: Promise<string> }> = ({ postId }) => {
  const id = use(postId);
  return (
    <div className="flex flex-col w-1/2 mx-auto gap-6">
      <PostDetails id={id} />
    </div>
  );
};
