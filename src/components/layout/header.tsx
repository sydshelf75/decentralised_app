"use client";

import { Brain, Search, User, Plus, Bell } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function Header() {
  const router = useRouter();
  const userId = "123";

  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-10 px-6 w-full bg-gray-900 border-b border-gray-800">
      <div className="flex items-center justify-between gap-6 w-full h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-white">DHKE</span>
            <div className="text-xs text-gray-400">Knowledge Engine</div>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input className="w-full bg-gray-800 border-gray-700 rounded-full py-3 pl-12 pr-20 text-gray-200 placeholder-gray-400 focus:ring-indigo-500 text-base" placeholder="Ask anything... AI + Human experts will answer" />
          <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 rounded-full px-5">Ask</Button>
        </div>
        {session ? (
          <div className="flex items-center gap-4">
            {/* Notification button */}
            <Button variant="ghost" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center">
              <Bell className="w-5 h-5 text-gray-300" />
            </Button>

            {/* Create button */}
            <Button className="rounded-full bg-indigo-600 hover:bg-indigo-500 px-4 py-2 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Create</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-10 h-10 rounded-full cursor-pointer bg-gray-700 flex items-center justify-center hover:ring-2 hover:ring-indigo-500 transition">
                  <User className="w-5 h-5 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-gray-900 text-gray-200 rounded-xl shadow-lg border border-gray-700 p-2" align="end">
                {/* View Profile */}
                <DropdownMenuItem className="flex flex-col items-start px-3 py-2 rounded-md hover:bg-gray-800 hover:text-indigo-400 cursor-pointer" onClick={() => router.push(`/user/${userId}`)}>
                  <span className="font-medium">View Profile</span>
                  <span className="text-xs text-gray-400">{userId}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-gray-700" />

                <DropdownMenuItem className="px-3 py-2 rounded-md hover:bg-gray-800 hover:text-indigo-400 cursor-pointer">Billing</DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 rounded-md hover:bg-gray-800 hover:text-indigo-400 cursor-pointer">Team</DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 rounded-md hover:bg-gray-800 hover:text-indigo-400 cursor-pointer">Subscription</DropdownMenuItem>

                <DropdownMenuSeparator className="bg-gray-700" />

                {/* Logout */}
                <DropdownMenuItem className="px-3 py-2 rounded-md hover:bg-red-600 hover:text-white cursor-pointer text-red-400" onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link href={"login"}>
            <Button type="submit" className=" h-10 text-base font-semibold bg-indigo-600 hover:bg-indigo-500 rounded-md cursor-pointer" size="lg">
              Log In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
