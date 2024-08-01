"use client";
import React, { useState } from "react";
import { MessageSquare, Zap, Stars, MailX, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChatInterface } from "./ChatInterface";

export function SideBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedAI, setSelectedAI] = useState("mix");
  const aiOptions = [
    { name: "All In One", logo: "/mix-logo.png", route: "/dashboard/all" },

    { name: "ChatGPT", logo: "/ChatGpt_logo.png", route: "/dashboard/chatgpt" },
    { name: "Claude AI", logo: "/Claude_logo.png", route: "/dashboard/claude" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex w-96 flex-col border-r bg-white p-5 shadow-md">
        <div className="mb-8 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-primary">AI Chat Suite</h1>
        </div>

        <nav className="flex-grow">
          {aiOptions.map((ai) => (
            <button
              onClick={() => {
                router.push(ai.route);
                setSelectedAI(ai.name);
              }}
              className={`mb-2 flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors duration-200 hover:bg-gray-100 ${selectedAI === ai.name ? "bg-gray-200" : ""}`}
            >
              <Image
                src={ai.logo}
                alt={`${ai.name} logo`}
                width={20}
                height={20}
                className="rounded-lg"
              />

              <span className="text-sm font-medium text-gray-700">
                {ai.name}
              </span>
            </button>
          ))}
        </nav>

        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start p-3 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={"/default-avatar.png"}
                      alt="User avatar"
                      width={40}
                      height={40}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {session.user.name}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={() => router.push("/api/auth/signin")}
            className="w-full"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}
