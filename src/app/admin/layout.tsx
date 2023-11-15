import { Gift, LifeBuoy, Package, Receipt, UserCircle } from "lucide-react";
import { PropsWithChildren } from "react";
import { Search } from "./_components/search-box";
import Sidebar, { SidebarItem } from "./_components/sidebar";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem
          href="/admin/products"
          text="Products"
          icon={<Gift size={20} />}
        />

        <SidebarItem
          href="/admin/customers"
          text="Customers"
          icon={<UserCircle size={20} />}
        />
        <SidebarItem
          href="/admin/orders"
          text="Orders"
          icon={<Package size={20} />}
          alert
        />
        <hr className="my-3" />
        <SidebarItem
          href="/admin/settings"
          text="Settings"
          icon={<Receipt size={20} />}
        />
        <SidebarItem
          href="/admin/help"
          text="Help"
          icon={<LifeBuoy size={20} />}
        />
      </Sidebar>
      <div className="h-screen w-full flex flex-col">
        <header className="border-b">
          <div className="flex h-14 items-center px-4">
            <Search />
            <div className="ml-auto flex items-center space-x-4">User nav</div>
          </div>
        </header>
        <div className="flex-1 h-[calc(100vh-56px)] overflow-y-auto space-y-4 p-8 pt-6">
          {children}
        </div>
      </div>
    </div>
  );
}
