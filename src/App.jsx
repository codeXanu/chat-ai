import { useState } from "react";
import { FiSearch, FiPaperclip, FiSend } from "react-icons/fi";
import Drawer from "./components/Drawer";
import CTASection from "./components/CTASection";
import ChatSection from "./components/ChatSection";
import ModelSelector from "./components/ModelSelector";
import { createChatThread } from "./utils/createChatThread";
import "./App.css";

function App() {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  // console.log(input)

  const handleSend = () => {
    if (!input.trim()) return;

    const newChats = [
      ...chats,
      { role: "user", content: input },
      { role: "assistant", content: `**AI Response:** You said "${input}"` }, // mock AI reply
    ];
    setChats(newChats);
    setInput("");
  };

  // for selecting model

  const handleModelChange = ({ provider, model }) => {
    console.log("Selected:", provider, model);
  };


  return (
    <main className="flex-1 flex flex-col h-screen justify-between items-center p-8">
      <Drawer chats={chats} setChats={setChats} />

      {/* Show CTA if no chats, otherwise ChatSection */}
      {chats.length === 0 && input === "" ? (
        <CTASection
          onSelectQuestion={(q) => setInput(q)}
        />
      ) : (
        <ChatSection chats={chats} />
      )}

      {/* Chat Input */}
      <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center  bg-yellow-100 rounded-xl px-2 py-2 sm:px-4 sm:py-3 mt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // stop page reload
            handleSend(); // only trigger your send
          }}
          className="w-full max-w-3xl flex flex-col sm:flex-row items-center  bg-yellow-100 rounded-xl 
 px-2 py-2 sm:px-4 sm:py-3 mt-4 gap-6"
        >
          <input
            type="text"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // prevent opening dropdown accidentally
                handleSend();
              }
            }}
            className="flex-1 bg-transparent focus:outline-none px-2"
          />

          <div className="flex items-center gap-3 text-yellow-800">
            <ModelSelector onChange={handleModelChange} />

            <button
              type="submit" // ✅ submit instead of onClick
              className="bg-yellow-500 text-white p-2 rounded-xl hover:bg-yellow-600"
            >
              <FiSend />
            </button>
          </div>
        </form>
      </div>
    </main>
    
  );
}

export default App;
