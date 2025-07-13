import type { Metadata } from "next";
import "./index.css";
import StoreProvider from "@/components/StoreProvider";

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
  return (
    <html lang="en">
      <body className="text-center p-4">
        <main className="max-w-7xl my-0 mx-auto w-full">
          <StoreProvider>{children}</StoreProvider>
        </main>
      </body>
    </html>
  );
}
