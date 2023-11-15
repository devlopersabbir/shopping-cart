import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className="h-full grid place-items-center">{children}</div>;
}
