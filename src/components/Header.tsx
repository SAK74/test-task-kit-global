import { UserLogo } from "./UserLogo";

export const Header = () => {
  return (
    <header className="flex py-2 px-4 sticky top-0 backdrop-blur-md border rounded-lg">
      <span className="grow">Post app</span>
      <UserLogo />
    </header>
  );
};
