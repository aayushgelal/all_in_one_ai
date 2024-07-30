"use client"
import React,{useState} from "react"
import { MessageSquare, Zap, Stars, MailX, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'
import Link from 'next/link';

import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { ChatInterface } from "./ChatInterface"

export function SideBar() {
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedAI, setSelectedAI] = useState('mix')
  const aiOptions = [
    { name: "ChatGPT",       logo:"/ChatGpt_logo.png"
    , route: "/dashboard/chatgpt" },
    { name: "Claude AI", logo: "/Claude_logo.png", route: "/dashboard/claude" },
    { name: "Mix", logo: "/mix-logo.png", route: "/dashboard/mix" },

  ];

 

  return (
    <div className="flex h-screen bg-gray-100">
      <div className=" w-96 bg-white shadow-md border-r p-5 flex flex-col">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-2xl font-bold text-primary">Multi-AI Dashboard</h1>
        </div>

        <nav className="flex-grow">
       
           {aiOptions.map((ai) => (
            <button         onClick={() => {
              router.push(ai.route)
              setSelectedAI(ai.name)
            }}     className={`flex items-center w-full gap-3 rounded-lg cursor-pointer hover:bg-gray-100 p-3 mb-2 transition-colors duration-200 ${selectedAI === ai.name ? 'bg-gray-200' : ''}`}
            >
                        <Image src={ai.logo} alt={`${ai.name} logo`} width={30} height={30} className="rounded-lg" />

            <span className="text-sm font-medium text-gray-700">{ai.name}</span>
        </button>
      ))}
        </nav>

        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full flex items-center justify-start p-3 hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={'/default-avatar.png'}
                      alt="User avatar"
                      width={40}
                      height={40}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{session.user.name}</span>
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
          <Button onClick={() => router.push('/api/auth/signin')} className="w-full">
            Sign In
          </Button>
        )}
      </div>
     

     
    </div>
  )
}