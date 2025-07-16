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
    <>
      <PostDetails id={id} />
    </>
  );
};
