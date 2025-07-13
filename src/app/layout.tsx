import type { Metadata } from "next";
import "./index.css";

export const metadata: Metadata = {
  title: "Posts service",
  description: "Test task",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-center p-4">{children}</body>
    </html>
  );
}
