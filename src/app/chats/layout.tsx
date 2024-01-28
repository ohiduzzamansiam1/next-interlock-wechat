import SignOutButton from "@/components/SignOutButton";
import ChatProfileCard from "@/components/chats/ChatProfileCard";
import { getAllUsers } from "@/helpers/firebaseApis";
import { authOptions } from "@/helpers/nextAuthHandler";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import logo from "../../../public/logo.svg";

async function ChatLayout({ children }: { children: React.ReactNode }) {
  {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/");
    const { users } = await getAllUsers();

    return (
      <>
        <div className="max-w-8xl h-dvh max-h-dvh py-2 flex flex-col container px-4">
          {/* Top Bar */}
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
          {/* User Cards */}
          <div className="flex-1 overflow-y-auto my-2 md:my-5 rounded-2xl shadow-2xl shadow-neutral-200 bg-white flex">
            {/* Left side of chat area or PC */}
            <div className="min-w-full md:min-w-[40%] md:max-w-[40%] lg:min-w-[30%] lg:max-w-[30%] border-0 md:border-r flex flex-col relative overflow-y-auto no-scrollbar">
              {/* Chat Text */}
              <h1 className="p-4 sticky top-0 left-0 bg-white border-b text-2xl font-extrabold text-neutral-800/90 text-center md:text-start">
                Chats
              </h1>
              <div className="chats flex-1 py-2 px-4">
                {users.map((user) => (
                  <Link href={`/chats/${user.email}`} key={user.id}>
                    <ChatProfileCard
                      name={user.name}
                      email={user.email}
                      image={user.image}
                    />
                  </Link>
                ))}
                {/* Add more ChatProfileCard components here */}
              </div>
            </div>
            {/* Right side of chat area for PC */}
            <div className="hidden md:inline w-full">{children}</div>
          </div>
        </div>
      </>
    );
  }
}

export default ChatLayout;
