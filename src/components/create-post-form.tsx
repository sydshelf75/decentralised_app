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

interface PostData {
  community: string;
  title: string;
  content: string;
}

export function CreatePostForm() {
  const [postData, setPostData] = useState<PostData>({
    community: "",
    title: "",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Post data:", postData);
  };

  const handleCancel = () => {
    setPostData({ community: "", title: "", content: "" });
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="community">Choose a community</Label>
            <Select value={postData.community} onValueChange={(value) => setPostData((prev) => ({ ...prev, community: value }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a community" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="r/technology">r/technology</SelectItem>
                <SelectItem value="r/science">r/science</SelectItem>
                <SelectItem value="r/programming">r/programming</SelectItem>
                <SelectItem value="r/design">r/design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
            <div className="p-4">
              <Input placeholder="Title" value={postData.title} onChange={(e) => setPostData((prev) => ({ ...prev, title: e.target.value }))} className="text-lg font-medium border-0 p-0 focus-visible:ring-0 shadow-none" />
            </div>
            <div className="border-t border-border">
              <Textarea placeholder="What's on your mind?" value={postData.content} onChange={(e) => setPostData((prev) => ({ ...prev, content: e.target.value }))} rows={8} className="resize-none border-0 focus-visible:ring-0 shadow-none" />
            </div>
            <div className="p-4 bg-muted border-t border-border flex items-center space-x-4">
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

          <div className="flex justify-end space-x-4 pt-4">
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
