import { useState, useEffect, useRef } from "react";

export default function Drawer({chats, setChats}) {
  const [isOpen, setIsOpen] = useState(true);
  const drawerRef = useRef(null);

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
                    <h1 className="text-2xl font-bold text-yellow-700 ml-15 ">Chat AI</h1>
                </div>

                <button className="w-full bg-yellow-400 text-white py-2 px-3 rounded-xl mb-4 hover:bg-yellow-600 transition" 
                  onClick={()=> setChats([])}
                >
                    New Chat
                </button>

                <div className="mb-6">
                    <input
                    type="text"
                    placeholder="Search your threads..."
                    className="w-full rounded-lg px-3 py-2 bg-yellow-100 focus:outline-none"
                    />
                </div>

                <div>
                    <p className="text-sm font-semibold text-yellow-800 mb-2">
                    Yesterday
                    </p>
                    <ul className="mb-4 space-y-1">
                    {chats.map((chat, index) => (
                        <li key={index} className="cursor-pointer hover:text-yellow-900">
                          <strong>{chat.role === "user" ? "User" : "AI"}:</strong> {chat.content}
                        </li>
                      ))}
                    </ul>

                    {/* <p className="text-sm font-semibold text-yellow-800 mb-2">
                    Last 7 Days
                    </p>
                    <ul className="space-y-1">
                    {chats.last7days.map((c, i) => (
                        <li key={i} className="cursor-pointer hover:text-yellow-900">
                        {c}
                        </li>
                    ))}
                    </ul> */}
                </div>
            </div>

            {/* Bottom user profile */}
            
            <div className="flex items-center space-x-3">
                <img
                    src="https://via.placeholder.com/40"
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <p className="font-semibold">Anuj Maurya</p>
                    <p className="text-sm text-gray-700">Free</p>
                </div>
            </div>
    
        </div>

        </div>
    </div>
  );
}
