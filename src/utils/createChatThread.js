// utils/createChatThread.js

/**
 * Creates a chat thread object from an array of chat messages.
 * 
 * @param {Array<{role: string, content: string}>} messages - Array of chat messages.
 * @returns {{ title: string, messages: Array }} thread object with title and messages.
 */
// utils/createChatThread.js

let threadIdCounter = 1;  // simple incrementing counter for thread ids

export function createChatThread(messages, active = true) {
  if (!messages || messages.length === 0) {
    return null;
  }

  const firstUserMessage = messages.find(msg => msg.role === "user")?.content || "Chat Thread";

  const wordArray = firstUserMessage.trim().split(/\s+/);
  const title = wordArray.length <= 8
    ? firstUserMessage
    : wordArray.slice(0, 8).join(" ") + "...";

  return {
    id: threadIdCounter++,        // assign unique id
    title,
    messages: [...messages],      // copy messages array
    createdAt: new Date().toLocaleString(),
    active,                      // true if thread is still open for new messages
  };
}

