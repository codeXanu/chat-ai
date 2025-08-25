import React from "react";
import ReactMarkdown from "react-markdown";
import { Copy , Check} from "lucide-react"; 

export default function ChatSection({ chats, chatLoading }) {

   const [copiedIndex, setCopiedIndex] = React.useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(idx); // Set this message as copied
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    });
  };

   return (
    <div className="flex-1 w-full max-w-3xl flex flex-col space-y-4 overflow-y-auto p-4 custom-scrollbar">
      {chats.map((chat, idx) => (
        <div
          key={idx}
          className={`flex items-start max-w-[70%] ${
            chat.role === "user"
              ? "self-end justify-end"
              : "self-start justify-start"
          }`}
        >
          <div
            className={`relative p-3 rounded-xl ${
              chat.role === "user"
                ? "bg-yellow-200 text-yellow-900"
                : " text-gray-800"
            }`}
          >
            {chat.role === "assistant" ? (
              <>
                <ReactMarkdown>{chat.content}</ReactMarkdown>
                {/* Copy button only for assistant messages */}
                {!chatLoading 
                ? 
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleCopy(chat.content, idx)}
                    className="p-1 rounded hover:bg-yellow-400 transition flex items-center gap-1 text-sm"
                    title="Copy"
                  >
                    {copiedIndex === idx ? <Check size={16} />: <Copy size={16} /> }
                    
                  </button>
                </div>
                :
                null
                }
              </>
            ) : (
              <>
              {chat.content}
              <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleCopy(chat.content, idx)}
                    className="p-1 rounded hover:bg-yellow-400 transition flex items-center gap-1 text-sm"
                    title="Copy"
                  >
                    {copiedIndex === idx ? <Check size={16} />: <Copy size={16} /> }
                    
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // return (
  //   <div className="flex-1 w-full max-w-3xl flex flex-col space-y-4 overflow-y-auto p-4 custom-scrollbar">
  //     {chats.map((chat, idx) => (
  //       <div
  //         key={idx}
  //         className={`p-3 rounded-xl max-w-[70%] ${
  //           chat.role === "user"
  //             ? "bg-yellow-200 text-yellow-900 self-end"
  //             : "bg-yellow-300 text-gray-800 self-start"
  //         }`}
  //       >
  //         {chat.role === "assistant" ? (
  //           <>
  //             <ReactMarkdown>{chat.content}</ReactMarkdown>
  //             {/* Copy button only for assistant messages */}
  //             <button
  //               onClick={() => handleCopy(chat.content)}
  //               className="absolute top-2 right-2 p-1 rounded hover:bg-yellow-400 transition"
  //               title="Copy"
  //             >
  //               <Copy size={16} />
  //             </button>
  //           </>
  //         ) : (
  //           chat.content
  //         )}
  //       </div>
  //     ))}
  //   </div>
  // );
}
