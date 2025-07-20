import { Dialog, DialogDescription } from "@radix-ui/react-dialog";
import {
  useState,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { UserCredential } from "firebase/auth";
import { auth } from "@/firebase/auth";
import {
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import type { AuthActionHook } from "react-firebase-hooks/auth/dist/auth/types";
import { Spinner } from "./Spinner";

export const LoginForm: FC<
  PropsWithChildren<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }>
> = ({ children, open, setOpen }) => {
  const [formType, setFormType] = useState<"login" | "register">("login");
  const signInHook = useSignInWithEmailAndPassword(auth);
  const registerHook = useCreateUserWithEmailAndPassword(auth);
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {formType === "login" ? "Log in" : "Register account"}
          </DialogTitle>
          <DialogDescription asChild>
            <Button
              variant={"link"}
              className="self-end"
              onClick={() => {
                setFormType((prev) =>
                  prev === "login" ? "register" : "login"
                );
              }}
            >
              {formType === "login"
                ? "Don't have account, register"
                : "Have already account, log in"}
            </Button>
          </DialogDescription>
        </DialogHeader>
        <AuthForm
          onClose={() => {
            setOpen(false);
          }}
          hook={formType === "login" ? signInHook : registerHook}
        />
      </DialogContent>
    </Dialog>
  );
};

const AuthForm: FC<{
  hook: AuthActionHook<
    (email: string, password: string) => Promise<UserCredential | undefined>
  >;
  onClose: () => void;
}> = ({ hook, onClose }) => {
  const [fn, user, loading, error] = hook;
  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault();
        const email = (ev.currentTarget["email"] as HTMLInputElement).value;
        const password = (ev.currentTarget["password"] as HTMLInputElement)
          .value;
        fn(email, password);
        if (user) {
          onClose();
        }
      }}
      className="*:w-2/3 space-y-1"
    >
      <Input
        type="email"
        name="email"
        placeholder="E-mail"
        ref={(el) => {
          el?.focus();
        }}
      />
      <Input type="text" name="password" placeholder="Password" />
      {error && <div className="text-destructive">{error.message}</div>}
      {loading && <Spinner />}
      <button type="submit"></button>
    </form>
  );
};
