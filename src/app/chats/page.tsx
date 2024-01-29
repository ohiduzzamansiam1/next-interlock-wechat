import { authOptions } from "@/helpers/nextAuthHandler";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function ChatHomePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <div className="w-full h-full grid place-content-center">
      <p className="font-medium text-neutral-600">
        Click on a chat to start messaging!
      </p>
    </div>
  );
}

export default ChatHomePage;
