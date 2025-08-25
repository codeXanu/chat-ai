// DropdownMenu.jsx
import { useState,useEffect } from "react";
import { ChevronUp, Eye, Star } from "lucide-react";

const menuItems = [
    { provider: "OpenAI", model: "gpt-4o-mini", name: "GPT-4o-mini", icon: <Star className="w-4 h-4 text-amber-400" />,  },
    { provider: "OpenAI", model: "gpt-5-nano", name: "GPT-5-nano", icon: <Star className="w-4 h-4 text-amber-400" />,  },
    { provider: "OpenAI", model: "gpt-5-mini", name: "GPT-5-mini", icon: <Star className="w-4 h-4 text-amber-400" />, badge: "Next-gen flagship" },
    { provider: "OpenAI", model: "gpt-4.1-mini", name: "GPT-4.1-mini", icon: <Star className="w-4 h-4 text-amber-400" />,  },
    { provider: "google", model: "gemini-2.5-flash", name: "Gemini 2.5 Flash", icon: <Star className="w-4 h-4 text-amber-400" />, badge: "Next-gen flagship", disabled: true },
    { provider: "google", model: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite", icon: <Star className="w-4 h-4 text-amber-400" />, badge: "Lite version", disabled: true },
    { provider: "google", model: "gemini-2.5-pro", name: "Gemini 2.5 Pro", icon: <Eye className="w-4 h-4 text-gray-400" />, disabled: true },
    { provider: "google", model: "gemini-imagen-4", name: "Gemini Imagen 4", icon: <Eye className="w-4 h-4 text-gray-400" />, disabled: true },
    { provider: "anthropic", model: "claude-4-sonnet", name: "Claude 4 Sonnet", icon: <Eye className="w-4 h-4 text-green-400" /> },
];

export default function ModelSelector({setSelectedProvider}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(menuItems[0]);
  // console.log((selected))

  useEffect(() => {
    setSelectedProvider(selected)
  },[selected]);

  const handleSelect = (item) => {
    if (item.disabled) return;
    setSelected(item);
    setOpen(false);

    // 🔑 Here you can use selected provider + model
    console.log("Selected Provider:", selected.provider);
    console.log("Selected Model:", selected.model);
  };

//   console.log("Selected Provider:", selected.provider);
//     console.log("Selected Model:", selected.model);
  return (
    <div className="relative inline-block text-left">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-amber-300 text-grey-700 rounded-xl flex items-center gap-2 hover:bg-amber-400 transition"
      >
        {selected ? selected.name : "Select Model"} <ChevronUp className="w-4 h-4" />
      </button>

      {/* Dropdown (opens UP) */}
      {open && (
        <div className="absolute bottom-full mb-2 w-64 bg-white shadow-2xl rounded-xl p-3 border border-amber-200 z-50">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(item)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer ${
                item.disabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-amber-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {!item.disabled && (
                <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-lg">
                  {item.badge || "Available"}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
