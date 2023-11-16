"use client";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronFirst, ChevronLast, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { User } from "next-auth";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  expanded: boolean;
};
const SidebarContext = createContext<SidebarContextType>({
  expanded: true,
});

export default function Sidebar({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Link
            href="/"
            className={cn(
              "text-sm overflow-hidden font-medium transition-colors flex items-center gap-2",
              expanded ? "w-52 ml-3" : "w-0"
            )}
          >
            <Icons.logo className="h-6 w-6" />
            <h1 className="text-2xl">Shopping Cart</h1>
          </Link>
          <Button
            onClick={() => setExpanded((prev) => !prev)}
            size="icon"
            variant="ghost"
            className=""
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </Button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          {user?.name ? (
            <>
              <Avatar className="h-8 w-8">
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name} />
                ) : null}
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n, i) => (i < 2 ? n.split("")[0] : null))}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "flex justify-between items-center overflow-hidden transition-all",
                  expanded ? " w-52 ml-3" : "w-0"
                )}
              >
                <div className="leading-4">
                  <h4 className="font-semibold">{user.name}</h4>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                <MoreHorizontal size={20} />
              </div>
            </>
          ) : null}
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  active?: boolean;
  alert?: boolean;
}) {
  const { expanded } = useContext(SidebarContext);
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "relative flex  group items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors",
        pathname === href || active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 dark:from-indigo-950/50 dark:to-indigo-950/20 dark:text-indigo-500"
          : "hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-muted-foreground"
      )}
    >
      {" "}
      {icon}{" "}
      <span
        className={cn(
          "overflow-hidden transition-all",
          expanded ? "w-52 ml-3" : "w-0"
        )}
      >
        {text}
      </span>
      {alert ? (
        <div
          className={cn(
            "absolute right-2 w-2 h-2 bg-indigo-400 rounded",
            expanded && "top-2"
          )}
        ></div>
      ) : null}
      {!expanded && (
        <div className="absolute left-ful rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-500 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </Link>
  );
}
