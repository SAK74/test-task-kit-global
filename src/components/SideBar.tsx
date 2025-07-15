import { useAuthState } from "react-firebase-hooks/auth";
import { AddPost } from "./AddPost";
import { FilterPanel } from "./FilterPanel";
import { SortPanel } from "./SortPanel";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { auth } from "@/firebase/auth";
import { SidebarContent, Sidebar as SideBarUi } from "./ui/sidebar";

export const SideBar = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <SideBarUi
        className="*:ml-4 pt-20 border-none  overflow-auto *:bg-background"
        collapsible="offcanvas"
      >
        <SidebarContent>
          <Card className="px-4">
            <CardHeader>
              <CardTitle className="italic font-light">{user?.email}</CardTitle>
            </CardHeader>
            <AddPost />
            <SortPanel />
            <FilterPanel />
          </Card>
        </SidebarContent>
      </SideBarUi>
    </>
  );
};
