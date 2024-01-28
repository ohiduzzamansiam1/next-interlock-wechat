"use client";

import Image from "next/image";
import { FirestoreUserData } from "../../../types";

function ChatProfileCard({ name, email, image }: FirestoreUserData) {
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
        <p className="text-sm font-medium text-black/50 line-clamp-1">
          {email}
        </p>
      </div>
    </div>
  );
}

export default ChatProfileCard;
