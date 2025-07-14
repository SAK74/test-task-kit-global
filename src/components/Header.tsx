import { auth } from "@/auth";
import { UserLogo } from "./UserLogo";

export const Header = async () => {
  const session = await auth();
  return (
    <header className="flex gap-4 py-2 px-4 sticky top-0 backdrop-blur-md border rounded-lg">
      <span className="grow">Post app</span>
      {session && `Welcome, ${session.user?.email}!`}
      <UserLogo />
    </header>
  );
};
