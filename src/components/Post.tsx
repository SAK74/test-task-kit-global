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
import { type Post } from "@/firebase";
import { Trash2Icon } from "lucide-react";
import { useTypedDispatch } from "@/store";
import { removePost } from "@/store/posts.slice";

export const SinglePost: FC<{ post: Post }> = ({ post }) => {
  const dispatch = useTypedDispatch();
  const handleRemove = async () => {
    dispatch(removePost(post.id));
  };
  return (
    <Card className="w-full shadow-lg p-2">
      <CardHeader className="relative">
        <CardTitle>{post.title}</CardTitle>
        <CardAction className="flex justify-between **:cursor-pointer">
          <Link to={`${Paths.details}/${post.id}`}>
            <Button variant={"link"} className="">
              Details...
            </Button>
          </Link>
          <Trash2Icon onClick={handleRemove} />
        </CardAction>
      </CardHeader>
      <CardContent className="border text-left rounded-md">
        {post.content}
      </CardContent>
    </Card>
  );
};
