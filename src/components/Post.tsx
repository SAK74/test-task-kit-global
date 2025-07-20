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
import { Link } from "react-router";
import { Paths } from "@/routes";
import { MessageSquareMoreIcon, Trash2Icon } from "lucide-react";
import { useTypedDispatch } from "@/store";
import { removePost, updatePostAction } from "@/store/posts.slice";
import type { Post } from "@/schema";
import { EditPost } from "./EditPost";
import { Tooltip } from "./Tooltip";
import { CommentPost } from "./CommentPost";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/auth";

export const SinglePost: FC<{ post: Post }> = ({ post }) => {
  const dispatch = useTypedDispatch();
  const handleRemove = async () => {
    dispatch(removePost(post.id));
  };
  const [user] = useAuthState(auth);

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
              by: user!.email!,
            });
            dispatch(updatePostAction({ id, data: { comments } }));
          }}
        >
          {user?.email !== post.author && (
            <Tooltip label="Comment the post">
              <Button
                variant={"ghost"}
                className="justify-self-start"
                disabled={!user}
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
          <Link to={`${Paths.details}/${post.id}`}>
            <Button variant={"link"} className="">
              Details...
            </Button>
          </Link>
          <EditPost post={post} />
          <Button
            variant={"ghost"}
            onClick={handleRemove}
            disabled={!user || user?.email !== post.author}
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
