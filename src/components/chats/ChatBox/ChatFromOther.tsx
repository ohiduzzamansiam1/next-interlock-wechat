"use client";

function ChatFromOther({
  message,
}: {
  message: string;
  image?: string;
  time?: string;
}) {
  return (
    <div className="w-full">
      <div className="bg-white mr-auto w-fit text-black/80 shadow-xl shadow-neutral-100 p-3 rounded-xl rounded-bl-none">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ChatFromOther;
