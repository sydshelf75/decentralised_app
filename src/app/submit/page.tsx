import { CreatePostForm } from "@/components/create-post-form";
import { Header } from "@/components/layout/header";

export default function CreatePostPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <CreatePostForm />
          </div>
        </div>
      </main>
    </div>
  );
}
