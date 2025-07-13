import type { FC } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { MessageSquareMoreIcon, Trash2Icon } from "lucide-react";
import { useTypedDispatch } from "@/store";
import { removePost, updatePostAction } from "@/store/posts.slice";
import type { Post } from "@/schema";
import { EditPost } from "./EditPost";
import { Tooltip } from "./Tooltip";
import { CommentPost } from "./CommentPost";
import Link from "next/link";

export const SinglePost: FC<{ post: Post }> = ({ post }) => {
  const dispatch = useTypedDispatch();
  const handleRemove = async () => {
    dispatch(removePost(post.id));
  };

  return (
    <Card className="w-full shadow-lg p-2">
      <CardHeader className="relative">
        <CommentPost
          id={post.id}
          onSubmit={(id, comment) => {
            const comments = [...post.comments];
            comments.push(comment);
            dispatch(updatePostAction({ id, data: { comments } }));
          }}
        >
          <Tooltip label="Comment the post">
            <Button variant={"ghost"} className="justify-self-start">
              <MessageSquareMoreIcon className="float-left" />
            </Button>
          </Tooltip>
        </CommentPost>

        <CardTitle>{post.title}</CardTitle>
        <CardAction className="flex justify-between **:cursor-pointer">
          <Link href={`/details/${post.id}`}>
            <Button variant={"link"} className="">
              Details...
            </Button>
          </Link>
          <EditPost post={post} />
          <Button variant={"ghost"} onClick={handleRemove}>
            <Trash2Icon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="border text-left rounded-md">
        {post.content}
      </CardContent>
    </Card>
  );
};
