// utils/createChatThread.js

/**
 * Creates a chat thread object from an array of chat messages.
 * 
 * @param {Array<{role: string, content: string}>} messages - Array of chat messages.
 * @returns {{ title: string, messages: Array }} thread object with title and messages.
 */

export function createChatThread(messages) {
  if (!messages || messages.length === 0) {
    return null;
    // return {
    //   title: "Empty Thread",
    //   messages: [],
    // };
  }

  // Find the first user message content to generate title
  const firstUserMessage = messages.find(msg => msg.role === "user")?.content || "Chat Thread";

  // Extract first 5 to 8 words for title if message is long
  const wordArray = firstUserMessage.trim().split(/\s+/);
  let title = "";

  if (wordArray.length <= 8) {
    title = firstUserMessage;
  } else {
    title = wordArray.slice(0, 8).join(" ") + "...";
  }

  return {
    title,
    messages,
    createdAt: new Date().toLocaleString(),  // ISO string of current time
  };
}
