import useChatsStore from "../store/store";
import { getModel } from "../types/models";

export async function sendMessage(message: string, currentChatId: string) {
  const setStatus = useChatsStore.getState().setStatus;
  const addMessage = useChatsStore.getState().addMessage;
  const setDraftMessage = useChatsStore.getState().setDraftMessage;

  const modelKey =
    useChatsStore.getState().chats.allChats[currentChatId].modelKey;
  if (modelKey === null) {
    return;
  }
  const model = getModel(modelKey);

  setStatus(currentChatId, "fetching");
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model.APIName,
        messages: [
          ...useChatsStore.getState().chats.allChats[currentChatId].messages,
          { "role": "user", "content": String(message) },
        ],
      }),
    },
  );

  if (!response.ok) {
    console.log("ERROR: ", response);
    setStatus(currentChatId, "error");
    return;
  }

  const data = await response.json();
  addMessage(
    currentChatId,
    "user",
    useChatsStore.getState().chats.allChats[currentChatId].draftMessage,
  );
  addMessage(currentChatId, "assistant", data.choices[0].message.content);
  setStatus(currentChatId, "idle");
  setDraftMessage(currentChatId, "");
}
