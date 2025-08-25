import { useState, useEffect, useRef } from "react";
import { createChatThread } from "../utils/createChatThread";
import handleLogout from "../utils/handleLogout";

export default function Drawer({ chats, setChats, user }) {
  // console.log(user?.photoURL)
  const [isOpen, setIsOpen] = useState(true);
  const drawerRef = useRef(null);

  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);

  function saveCurrentThreadAndClear() {
    const newThread = createChatThread(chats);
    if (newThread) {
      setThreads((prev) => [newThread, ...prev]); // add new thread to start of list
      setChats([]); // clear current input
    }
  }

  // Close drawer when clicking outside (mobile only)
  useEffect(() => {
    function handleClickOutside(event) {
      const isMobile = window.innerWidth < 768; // Tailwind md breakpoint
      if (
        isMobile &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        !event.target.closest("#drawer-toggle")
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function handleClearAndCreateThread() {
    // const currentThread = createChatThread(chats);
    saveCurrentThreadAndClear();
    // setChats([]); // Clear chat state after creating thread
    // console.log("Thread title:", currentThread?.title);
    // console.log("Thread messages:", currentThread?.messages);
    // console.log("Thread timing:", currentThread?.createdAt);

    // Here you can add code to save currentThread to your database if needed
  }

  function loadThread(thread) {
    setChats(thread.messages);
    setActiveThreadId(thread.id); // optionally track which thread is open
  }

  return (
    <div>
      {/* Toggle Button */}
      <button
        id="drawer-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-yellow-400 text-white rounded-md"
      >
        {isOpen ? "✖" : " ≡ "}
      </button>

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-64 bg-yellow-100 text-black p-4 shadow-xl transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Drawer header with toggle icon */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-yellow-700 ml-15 ">
                Chat AI
              </h1>
            </div>

            <button
              className="w-full bg-yellow-400 text-white py-2 px-3 rounded-xl mb-4 hover:bg-yellow-600 transition"
              onClick={handleClearAndCreateThread}
            >
              New Chat
            </button>


            <div className=" overflow-y-auto max-h-[60vh] custom-scrollbar">
              <p className="text-sm font-semibold text-yellow-800 mb-2">
                Chat History
              </p>
              <ul className="mb-4 space-y-1">
                {threads.map((thread, index) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:text-yellow-900 border-b border-yellow-200 py-2"
                    onClick={() => loadThread(thread)}
                  >
                    <strong>{thread.title}</strong>
                    <br />
                    <small className="text-yellow-600 text-xs">
                      {thread.createdAt}
                    </small>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom user profile */}
          {user && (
            <div>
              <div className="flex items-center space-x-3">
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{user?.displayName || "User"}</p>
                  <p className="text-sm text-gray-700">Free</p>
                </div>
              </div>
              <div
                onClick={handleLogout}
                className="bg-red-500 text-white text-center px-2 py-1 mt-3 rounded-lg cursor-pointer 
                 hover:bg-red-600 active:bg-red-700 transition-colors duration-200"
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
