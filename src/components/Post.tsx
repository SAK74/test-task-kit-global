import { type FC } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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
import { useSession } from "next-auth/react";

export const SinglePost: FC<{ post: Post }> = ({ post }) => {
  const dispatch = useTypedDispatch();
  const handleRemove = async () => {
    dispatch(removePost(post.id));
  };
  const { data } = useSession();

  return (
    <Card className="w-full shadow-lg p-2">
      <CardHeader className="relative">
        <CommentPost
          id={post.id}
          onSubmit={(id, comment) => {
            const comments = [...post.comments];
            comments.push({
              text: comment,
              timestamp: Date.now(),
              by: data?.user?.email ?? "unknown",
            });
            dispatch(updatePostAction({ id, data: { comments } }));
          }}
        >
          {data?.user?.email !== post.author && (
            <Tooltip label="Comment the post">
              <Button
                variant={"ghost"}
                className="justify-self-start"
                disabled={!data?.user}
              >
                <MessageSquareMoreIcon className="float-left" />
              </Button>
            </Tooltip>
          )}
        </CommentPost>

        <CardTitle>{post.title}</CardTitle>
        <CardDescription className="text-left">
          By {post.author}
        </CardDescription>
        <CardAction className="flex justify-between **:cursor-pointer">
          <Link href={`/details/${post.id}`}>
            <Button variant={"link"} className="">
              Details...
            </Button>
          </Link>
          <EditPost post={post} />
          <Button
            variant={"ghost"}
            onClick={handleRemove}
            disabled={!data?.user || data.user.email !== post.author}
          >
            <Trash2Icon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-left whitespace-pre overflow-hidden overflow-ellipsis break-all">
        {post.content}
      </CardContent>
    </Card>
  );
};
