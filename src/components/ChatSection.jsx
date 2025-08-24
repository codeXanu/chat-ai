import React from "react";
import ReactMarkdown from "react-markdown";

export default function ChatSection({ chats }) {
  return (
    <div className="flex-1 w-full max-w-3xl flex flex-col space-y-4 overflow-y-auto p-4 custom-scrollbar">
      {chats.map((chat, idx) => (
        <div
          key={idx}
          className={`p-3 rounded-xl max-w-[70%] ${
            chat.role === "user"
              ? "bg-yellow-200 text-yellow-900 self-end"
              : " text-gray-800 self-start"
          }`}
        >
          {chat.role === "assistant" ? (
            <ReactMarkdown>{chat.content}</ReactMarkdown>
          ) : (
            chat.content
          )}
        </div>
      ))}
    </div>
  );
}
