"use client";

import { db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function ChatForm({ receiverEmail }: { receiverEmail: string }) {
  const session = useSession();
  const [message, setMessage] = useState("");
  const handleChatSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = message;
    setMessage("");

    const chatDocsRef = doc(
      db,
      "chats",
      [session?.data?.user?.email, receiverEmail].sort().join("-"),
      "messages",
      Date.now().toString()
    );
    await setDoc(chatDocsRef, {
      id: Date.now().toString(),
      sender: {
        id: session?.data?.user?.email,
        name: session?.data?.user?.name,
        image: session?.data?.user?.image,
        email: session?.data?.user?.email,
      },
      message: text,
      isRead: false,
      timestamp: Date.now().toString(),
    });
  };
  return (
    <form className="p-4 flex gap-2" onSubmit={handleChatSubmit}>
      <Input
        type="text"
        placeholder="Type a message"
        className="flex-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" disabled={!message.trim().length}>
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}

export default ChatForm;
