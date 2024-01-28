"use client";

function ChatFromMe({ message, isRead }: { message: string; isRead: boolean }) {
  return (
    <div className="w-full my-1">
      <div className="bg-indigo-500 ml-auto w-fit text-white p-3 rounded-xl">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ChatFromMe;
