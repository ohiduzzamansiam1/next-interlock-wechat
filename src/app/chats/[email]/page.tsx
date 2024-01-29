"use client";

import ShowLottie from "@/components/ShowLottie";
import ChatFromMe from "@/components/chats/ChatBox/ChatFromMe";
import ChatFromOther from "@/components/chats/ChatBox/ChatFromOther";
import ChatForm from "@/components/chats/ChatForm";
import { db } from "@/firebase/firebase";
import { DocumentData, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import loadingLottie from "../../../../public/animations/loading.json";
import { ChatType } from "../../../../types";

function ChatPage({ params }: { params: { email: string } }) {
  const receiverEmail = decodeURIComponent(params.email);
  const session = useSession();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showChats, setShowChats] = useState(false);

  const [chats, isLoading] = useCollection<ChatType[] | DocumentData>(
    collection(
      db,
      "chats",
      [session?.data?.user?.email, receiverEmail].sort().join("-"),
      "messages"
    )
  );

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setShowChats(true);
      }, 1000);
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo(
        0,
        chatContainerRef.current.scrollHeight
      );
    }
  }, [chats]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        {!showChats || chats?.docs.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            {!showChats ? (
              <ShowLottie lottieFile={loadingLottie} width="10%" height="10%" />
            ) : (
              <p className="text-sm text-neutral-500">No messages yet!</p>
            )}
          </div>
        ) : (
          <div
            ref={chatContainerRef}
            className="chats flex flex-col p-4 overflow-y-auto no-scrollbar scroll-smooth"
            style={{ maxHeight: "calc(100dvh - 200px)" }}
          >
            {chats?.docs.map((chat) => {
              const chatData = chat.data() as ChatType;
              const isMe = chatData.sender.email === session?.data?.user?.email;
              return (
                <div key={chat.id} className={`my-1 ${isMe ? "ml-auto" : ""}`}>
                  {isMe ? (
                    <ChatFromMe
                      message={chatData.message}
                      isRead={chatData.isRead}
                    />
                  ) : (
                    <ChatFromOther message={chatData.message} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ChatForm receiverEmail={receiverEmail} />
    </div>
  );
}

export default ChatPage;
