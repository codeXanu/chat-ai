import { useState } from "react";
import { FiSearch, FiPaperclip, FiSend } from "react-icons/fi";
import Drawer from "./components/Drawer";
import CTASection from "./components/CTASection";
import ChatSection from "./components/ChatSection";
import ModelSelector from "./components/ModelSelector";
import './App.css'

function App() {


  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

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

  const [oldChats] = useState({
    yesterday: ["Bhub", "Rs in strawberry"],
    last7days: ["Greeting Title", "Introduction Please"],
  });

  return (
    <main className="flex-1 flex flex-col h-screen justify-between items-center p-8">
      <Drawer chats={oldChats} setChats= {setChats} />

      {/* Show CTA if no chats, otherwise ChatSection */}
      {chats.length === 0 ? (
        <CTASection onSelectQuestion={(q) => setChats([{ role: "user", content: q }])} />
      ) : (
        <ChatSection chats={chats} />
      )}

      {/* Chat Input */}
      <div className="w-full max-w-3xl flex items-center bg-yellow-100 rounded-xl px-4 py-3 mt-4">
        <input
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none px-2"
        />
        <div className="flex items-center gap-3 text-yellow-800">
          <ModelSelector onChange={handleModelChange} />
          
          <button
            onClick={handleSend}
            className="bg-yellow-500 text-white p-2 rounded-xl hover:bg-yellow-600"
          >
            <FiSend />
          </button>
        </div>
      </div>
    </main>
    // <div className="flex h-screen bg-yellow-50 text-gray-900">
      
    //   {/* Drawer */}
    //   <Drawer chats={oldChats} />

    //   {/* Main Chat Section */}
    //   <main className="flex-1 flex flex-col justify-between items-center p-8">
    //     {/* Center content */}
    //     <div className="flex-1 flex flex-col justify-center items-center">
    //       <h2 className="text-2xl font-bold mb-6">
    //         How can I help you, Anuj?
    //       </h2>
    //       <div className="flex gap-4 mb-8">
    //         {["Create", "Explore", "Code", "Learn"].map((btn) => (
    //           <button
    //             key={btn}
    //             className="px-4 py-2 bg-yellow-100 text-yellow-900 rounded-xl hover:bg-yellow-400"
    //           >
    //             {btn}
    //           </button>
    //         ))}
    //       </div>
    //       <ul className="text-left space-y-2 text-gray-800">
    //         <li>How does AI work?</li> <hr />
    //         <li>Are black holes real?</li> <hr />
    //         <li>How many Rs are in the word "strawberry"?</li> <hr />
    //         <li>What is the meaning of life?</li> <hr />
    //       </ul>
    //     </div>

    //     {/* Chat Input */}
    //     <div className="w-full max-w-3xl flex items-center bg-yellow-100 rounded-xl px-4 py-3">
    //       <input
    //         type="text"
    //         placeholder="Type your message here..."
    //         className="flex-1 bg-transparent focus:outline-none px-2"
    //       />
    //       <div className="flex items-center gap-3 text-yellow-800">
    //         <select className="bg-yellow-200 px-2 py-1 rounded-lg">
    //           <option>Gemini 2.5 Flash</option>
    //           <option>GPT-4</option>
    //           <option>Mistral</option>
    //         </select>
    //         <FiSearch size={18} />
    //         <FiPaperclip size={18} />
    //         <button className="bg-yellow-500 text-white p-2 rounded-xl hover:bg-yellow-600">
    //           <FiSend />
    //         </button>
    //       </div>
    //     </div>
    //   </main>
    // </div>
  );
}

export default App;
