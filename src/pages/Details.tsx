import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Paths } from "@/routes";
import { useTypedSelector } from "@/store";
import { selectPostById } from "@/store/posts.slice";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { Link, useParams } from "react-router";
// import { fakePosts } from "@/../tests/mocks";

export const Details = () => {
  const params = useParams();
  const id = params.id!;
  const post = useTypedSelector((state) => selectPostById(state, id));
  // const post = fakePosts[0];

  return (
    <main className="flex flex-col w-1/2 mx-auto gap-6">
      <Link to={`${Paths.root}`} className="self-start">
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
          <p className="text-center">Commented by:</p>
          <ul className="italic list-disc list-inside">
            {post.comments?.map((comment, i) => (
              <li key={i} className="flex justify-between">
                <span>
                  <span className="font-semibold">
                    {comment.by ?? "unknown"}:
                  </span>{" "}
                  {comment.text}
                </span>
                <span className="text-xs">
                  {comment.timestamp &&
                    new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
};
