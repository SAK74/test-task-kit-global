import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";
import type { FC } from "react";

type SpinnerProps = {
  className?: string;
};

export const Spinner: FC<SpinnerProps> = ({ className }) => {
  return <LoaderCircleIcon className={cn("animate-spin", className)} />;
};
