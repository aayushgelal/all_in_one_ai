import React from "react";
import { SideBar } from "./_components/sidebar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';


export default function layout({
    children,
}: {
  children: React.ReactNode;
}) {

    return (
        <div className="">
            <div className=' md:w-64 hidden md:block fixed'>
                <SideBar />
                </div>
                <div className="md:ml-64">
                {children}
                <Toaster position="bottom-right"/>


                </div>
        </div>
    );
}