export async function sendChatRequest(input, selectedProvider) {
    console.log(`hello ${selectedProvider.model}`)
  try {
    const response = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: selectedProvider.provider,
        model: selectedProvider.model,
        prompt: input,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch");
    }

    return data.response;  // AI response text
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}
