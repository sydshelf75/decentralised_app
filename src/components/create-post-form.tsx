"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Video, Link } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PostData {
  community: string;
  title: string;
  content: string;
}

export function CreatePostForm() {
  const router = useRouter();
  const [postData, setPostData] = useState<PostData>({
    community: "",
    title: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Post data:", postData);

    try {
      console.log("api calling");
      const response = await fetch("/api/knowledge-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      console.log("response status:", response.status);

      if (!response.ok) {
        // This will help you see what kind of error you're getting
        const errorData = await response.json();
        console.log("HTTP error:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      toast("Post created successfully!");
      setPostData({ community: "", title: "", content: "" });
      router.push("/");
    } catch (error) {
      console.log("Error:", error);
      toast("Failed to create post");
    }
  };
  const handleCancel = () => {
    setPostData({ community: "", title: "", content: "" });
  };

  return (
    <Card className="border-gray-900 bg-gray-900 text-gray-200">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="community">Choose a community</Label>
            <Select value={postData.community} onValueChange={(value) => setPostData((prev) => ({ ...prev, community: value }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a community" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-gray-400">
                <SelectItem value="r/technology">r/technology</SelectItem>
                <SelectItem value="r/science">r/science</SelectItem>
                <SelectItem value="r/programming">r/programming</SelectItem>
                <SelectItem value="r/design">r/design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border border-gray-900 space-y-5 rounded-lg overflow-hidden  focus-within:ring-primary">
            <div className="">
              <Input placeholder="Title" value={postData.title} onChange={(e) => setPostData((prev) => ({ ...prev, title: e.target.value }))} className="text-lg font-medium border border-gray-500 p-5 focus-visible:ring-0 shadow-none" />
            </div>
            <div>
              <Textarea placeholder="What's on your mind?" value={postData.content} onChange={(e) => setPostData((prev) => ({ ...prev, content: e.target.value }))} rows={8} className="resize-none border border-gray-500 focus-visible:ring-0 shadow-none" />
            </div>
            <div className="p-4 bg-gray-900 border-t border-gray-900 flex items-center space-x-4">
              <Button type="button" variant="ghost" size="icon" className="rounded-full hover:bg-primary/20 hover:text-primary">
                <Image className="h-6 w-6" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="rounded-full hover:bg-primary/20 hover:text-primary">
                <Video className="h-6 w-6" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="rounded-full hover:bg-primary/20 hover:text-primary">
                <Link className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="flex bg-gray-900 justify-end space-x-4 pt-4">
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
