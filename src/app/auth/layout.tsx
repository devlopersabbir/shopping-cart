import { getAuthSesssion } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getAuthSesssion();
  if (session?.user) {
    if (session.user.role === "ADMIN") {
      return redirect("/dashboard");
    }
    return redirect("/");
  }

  return <main className="h-full grid place-items-center">{children}</main>;
}
