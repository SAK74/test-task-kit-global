import type { Metadata } from "next";
import "./index.css";
import StoreProvider from "@/components/StoreProvider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { authConfig } from "@/auth.config";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Posts service",
  description: "Test task",
  icons: {
    icon: "./react.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="text-center p-4">
        <div className="max-w-7xl my-0 mx-auto w-full">
          <Header />
          <SessionProvider session={session} basePath={authConfig.basePath}>
            <StoreProvider>{children}</StoreProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
