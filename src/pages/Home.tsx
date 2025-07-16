import { FilterProvider } from "@/components/FilterProvider";
import { PostsView } from "@/components/PostsView";
import { SideBar } from "@/components/SideBar";
import { SortProvider } from "@/components/SortProvider";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const Home = () => {
  return (
    <SidebarProvider>
      <SortProvider>
        <FilterProvider>
          <SideBar />
          <SidebarTrigger className="sticky top-32" />
          <ViewWithSideBar />
        </FilterProvider>
      </SortProvider>
    </SidebarProvider>
  );
};

const ViewWithSideBar = () => {
  const { open, isMobile } = useSidebar();
  return (
    <div
      className={cn("w-[calc(100%-28px)]", {
        "w-[calc(100%-28px-16rem)]": open && !isMobile,
      })}
    >
      <h1>Posts</h1>
      <PostsView className="" />
    </div>
  );
};
