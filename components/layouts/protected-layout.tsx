import { auth, CustomSession } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as CustomSession | null;

  if (!session || !session.user.access_token) {
    redirect("/auth/login");
  }
  return <div>{children}</div>;
}
