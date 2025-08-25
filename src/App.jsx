import { useState, useEffect } from "react";
import { FiSearch, FiPaperclip, FiSend } from "react-icons/fi";
import Drawer from "./components/Drawer";
import CTASection from "./components/CTASection";
import ChatSection from "./components/ChatSection";
import ModelSelector from "./components/ModelSelector";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login.jsx";
import { sendChatRequest } from "./utils/api.js";

import "./App.css";

function App() {
  const [chats, setChats] = useState([]);

  const [input, setInput] = useState("");
  // console.log(input)
  const [selectedProvider, setSelectedProvider] = useState();
  const [aiResponse, setAiResponse] = useState("");
  // console.log(`Hello from AI ${aiResponse}`)

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // console.log(user.photoURL)
 

  const handleSend = async () => {
    if (!input.trim()) return;
    setInput("");
    const newChats = [
      ...chats,
      { role: "user", content: input },
      { role: "assistant", content: "Writing...", isLoading: true },
      // { role: "assistant", content: `"${aiResponse}"` }, 
    ];
    setChats(newChats);
    setChatLoading(true);
    
    try {
      const responseText = await sendChatRequest(input, selectedProvider);
       if (!responseText) {
      throw new Error("No data returned from API");
    }
    // setChats(prev => [...prev, { role: "assistant", content: responseText }]);
    setChats((prevChats) =>
      prevChats.map((chat, i) =>
        chat.isLoading
          ? { role: "assistant", content: responseText }
          : chat
      )
    );
      // console.log(responseText)
      setAiResponse(responseText);
      // You can also add this response to your chat messages state
    } catch (error) {
      console.error("Error in handleSend:", error);
      alert("Error getting AI response: " + error.message);
    } finally {
      setChatLoading(false);
    }

    
    
  };

  // for selecting model

  const handleModelChange = ({ provider, model }) => {
    console.log("Selected:", provider, model);
  };


   if (loading) {
    // Show a loading placeholder until auth state is known
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading Your App...</p>
      </div>
    );
  }



  return (
    <main className="flex-1 flex flex-col h-screen justify-between items-center p-8">
      <Drawer chats={chats} setChats={setChats} user = {user} />

      {/* Show CTA if no chats, otherwise ChatSection */}
      {user ? (
        chats.length === 0 && input === "" ? (
          <CTASection onSelectQuestion={(q) => setInput(q)} user = {user} />
        ) : (
          <ChatSection chats={chats} chatLoading = {chatLoading} />
        )
        ) : (
          <Login setUser={setUser} />
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
            <ModelSelector onChange={handleModelChange} setSelectedProvider={setSelectedProvider} />

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
