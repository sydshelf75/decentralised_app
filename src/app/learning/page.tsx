import { Sidebar } from "@/components/layout/sidebar";
import { MainContent } from "@/components/layout/main-content";
import { RightSidebar } from "@/components/layout/right-sidebar";

export default function LearningPage() {
  return (
    <div className="grid grid-cols-[240px_1fr_300px] gap-6 p-6 h-screen">
      <Sidebar />
      <MainContent>
        <h1 className="text-2xl font-bold">My Learning</h1>
      </MainContent>
      <RightSidebar />
    </div>
  );
}
