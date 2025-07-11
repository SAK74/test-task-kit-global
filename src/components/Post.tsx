import type { FC } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { Paths } from "@/routes";
import type { Post } from "@/firebase";

export const SinglePost: FC<{ post: Post }> = ({ post }) => {
  return (
    <Card className="w-96 shadow-lg p-2">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardAction>
          <Link to={`${Paths.details}/${post.id}`}>
            <Button variant={"link"} className="cursor-pointer">
              Details...
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="border text-left rounded-md">
        {post.content}
      </CardContent>
    </Card>
  );
};
