// import { Details } from "@/components/Details";
import { Details } from "@/components/Details";
import { Spinner } from "@/components/Spinner";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<Spinner />}>
      <Details postId={params.then((p) => p.id)} />
    </Suspense>
  );
}
