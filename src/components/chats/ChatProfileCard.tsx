"use client";

import { db } from "@/firebase/firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChatType, FirestoreUserData } from "../../../types";

function ChatProfileCard({ name, email, image }: FirestoreUserData) {
  const session = useSession();
  const [lastMsg, setLastMsg] = useState("");

  const lastMsgQuery = query(
    collection(
      db,
      `chats/${[session?.data?.user?.email, email].sort().join("-")}/messages`
    ),
    where("sender.email", "==", email),
    limit(1),
    orderBy("timestamp", "desc")
  );

  const getLastMsg = () => {
    onSnapshot(lastMsgQuery, (snapshot) => {
      if (snapshot.empty) {
        setLastMsg("Hey! I'm new here!");
        return;
      }
      snapshot.docs.forEach((doc) => {
        setLastMsg((doc.data() as ChatType).message);
      });
    });
  };

  useEffect(() => {
    getLastMsg();
  }, []);

  return (
    <div className="flex gap-3 items-center white rounded-md shadow-xl shadow-neutral-100 p-3 cursor-pointer select-none my-2">
      {/* Chat user profile image */}
      <Image
        src={image ?? ""}
        alt="Logo"
        width={1000}
        height={1000}
        quality={100}
        className="min-w-14 min-h-14 max-w-14 max-h-14 object-cover rounded-full border-white border-2"
      />
      {/* Name and Last Chat*/}
      <div className="flex flex-col">
        <h1 className="font-semibold text-neutral-800">{name}</h1>
        <p className="text-sm font-medium text-black/50 ">{lastMsg}</p>
      </div>
    </div>
  );
}

export default ChatProfileCard;
