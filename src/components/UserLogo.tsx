import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { auth, logOut } from "@/firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LoginForm } from "./LoginForm";
import { useState } from "react";

export const UserLogo = () => {
  const [user] = useAuthState(auth);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          <AvatarFallback>
            {user ? user.email?.slice(0, 2) : "?"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user && (
          <>
            <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                logOut();
              }}
            >
              Logout
            </DropdownMenuItem>
          </>
        )}
        {!user && (
          <LoginForm open={formOpen} setOpen={setFormOpen}>
            <DropdownMenuItem
              onClick={(ev) => {
                ev.preventDefault();
                setFormOpen(true);
              }}
            >
              Login / Register
            </DropdownMenuItem>
          </LoginForm>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
