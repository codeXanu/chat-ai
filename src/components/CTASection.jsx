import React from "react";

export default function CTASection({ onSelectQuestion }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-6">
        How can I help you, Anuj?
      </h2>

      {/* Action buttons */}
      <div className="flex gap-4 mb-8">
        {["Create", "Explore", "Code", "Learn"].map((btn) => (
          <button
            key={btn}
            className="px-4 py-2 bg-yellow-100 text-yellow-900 rounded-xl hover:bg-yellow-400"
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Suggested questions */}
      <ul className="text-left space-y-2 text-gray-800">
        {[
          "How does AI work?",
          "Are black holes real?",
          "How many Rs are in the word 'strawberry'?",
          "What is the meaning of life?",
        ].map((q) => (
          <li
            key={q}
            className="cursor-pointer hover:text-yellow-700"
            onClick={() => onSelectQuestion(q)}
          >
            {q}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
