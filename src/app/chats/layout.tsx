"use client";

import SignOutButton from "@/components/SignOutButton";
import ChatProfileCard from "@/components/chats/ChatProfileCard";
import { db } from "@/firebase/firebase";
import { DocumentData, collection, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import logo from "../../../public/logo.png";
import { FirestoreUserData } from "../../../types";

function ChatLayout({ children }: { children: React.ReactNode }) {
  {
    const session = useSession();

    const showHeader = usePathname() == "/chats";
    const [showChatSection, setShowChatSection] = useState(false);

    const [users, isLoading] = useCollection<
      FirestoreUserData[] | DocumentData
    >(
      query(
        collection(db, "users"),
        where("email", "!=", session.data?.user?.email ?? "")
      )
    );

    return (
      <>
        <div className="max-w-8xl h-dvh max-h-dvh py-2 flex flex-col container px-4">
          {/* Top Bar */}
          {showHeader && (
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-2xl shadow-neutral-200">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Logo"
                  property="true"
                  width={1000}
                  height={1000}
                  quality={100}
                  className="w-32 cursor-pointer"
                />
              </Link>
              <SignOutButton />
            </div>
          )}
          {/* User Cards */}
          <div
            className={`flex-1 overflow-y-auto my-2 md:my-5 rounded-2xl shadow-2xl shadow-neutral-200 bg-white flex`}
          >
            {/* Left side of chat area or PC */}
            <div
              className={`min-w-full md:min-w-[40%] md:max-w-[40%] lg:min-w-[30%] lg:max-w-[30%] border-0 md:border-r flex flex-col relative overflow-y-auto no-scrollbar ${
                showChatSection ? "hidden" : "inline"
              } md:inline`}
            >
              {/* Chat Text */}
              <h1 className="p-4 sticky top-0 left-0 bg-white border-b text-2xl font-extrabold text-neutral-800/90 text-center md:text-start">
                Chats
              </h1>
              <div className="chats py-2 px-4">
                {!isLoading && (
                  <>
                    {users?.docs.map((user) => (
                      <Link
                        key={(user.data() as FirestoreUserData).id}
                        onClick={() => setShowChatSection(true)}
                        href={`/chats/${
                          (user.data() as FirestoreUserData).email
                        }`}
                      >
                        <ChatProfileCard
                          name={(user.data() as FirestoreUserData).name}
                          email={(user.data() as FirestoreUserData).email}
                          image={(user.data() as FirestoreUserData).image}
                        />
                      </Link>
                    ))}
                  </>
                )}
                {/* Add more ChatProfileCard components here */}
              </div>
            </div>
            {/* Right side of chat area for PC */}
            <div
              className={`${
                showChatSection ? "inline" : "hidden"
              } md:inline w-full`}
            >
              {children}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ChatLayout;
