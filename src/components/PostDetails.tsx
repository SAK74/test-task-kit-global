"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTypedSelector } from "@/store";
import { selectPostById } from "@/store/posts.slice";
import { ArrowBigLeftDashIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const Details: FC<{ id: string }> = ({ id }) => {
  const post = useTypedSelector((state) => selectPostById(state, id));

  // const post = fakePosts[0];

  return (
    <>
      <Link href={"/"} className="self-start">
        <Button variant={"link"}>
          <ArrowBigLeftDashIcon />
          Back to view
        </Button>
      </Link>
      <Card className="">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription className="flex justify-between">
            <span>{post.author ?? "Author"}</span>
            <span>
              {post.timestamp
                ? new Date(post.timestamp).toLocaleDateString()
                : "-"}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-left">
          <div>{post.content}</div>
          <Separator className="my-2" />
          <ul className="italic list-disc list-inside">
            {post.comments?.map((comment, i) => (
              <li key={i} className="">
                <span className="font-semibold">
                  {post.author ?? "Author"}:
                </span>{" "}
                {comment}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};
