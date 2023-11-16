import { getAuthSesssion } from "@/lib/auth";
import UserNavDropdown from "./user-nav-dropdown";

export default async function UserNav() {
  const session = await getAuthSesssion();
  if (!session?.user) {
    return null;
  }

  return <UserNavDropdown user={session.user} />;
}
