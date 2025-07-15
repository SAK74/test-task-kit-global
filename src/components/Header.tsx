import { auth } from "@/auth";
import { UserLogo } from "./UserLogo";

export const Header = async () => {
  const session = await auth();
  return (
    <header className="flex gap-4 items-center py-2 px-4 sticky top-0 backdrop-blur-md border rounded-lg z-10">
      <span className="grow">Post app</span>
      {session && (
        <span className="dark:text-cyan-500 text-blue-800">
          Welcome, {session?.user?.email}!
        </span>
      )}
      <UserLogo />
    </header>
  );
};
