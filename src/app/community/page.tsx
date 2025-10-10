import { Header } from "@/components/layout/header";
import { MainContent } from "@/components/layout/main-content";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { Sidebar } from "@/components/layout/sidebar";

export default function CommunityPage() {
  return (
    <>
      <div className="w-full px-7 py-4">
        <Header />
      </div>
      <div className="grid grid-cols-[240px_1fr_300px] gap-6 p-6 h-screen">
        <Sidebar />
        <MainContent>
          <h1 className="text-2xl font-bold">Community</h1>
        </MainContent>
        <RightSidebar />
      </div>
    </>
  );
}
