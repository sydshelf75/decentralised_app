import { Sidebar } from "@/components/layout/sidebar";
import { MainContent } from "@/components/layout/main-content";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { Header } from "@/components/layout/header";

export default function ExpertsPage() {
  return (
    <>
      <div className="w-full px-7 py-4">
        <Header />
      </div>
      <div className="grid grid-cols-[240px_1fr_300px] gap-6 p-6 h-screen">
        <Sidebar />
        <MainContent>
          <h1 className="text-2xl font-bold">Experts</h1>
        </MainContent>
        <RightSidebar />
      </div>
    </>
  );
}
