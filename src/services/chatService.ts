import useChatsStore from "../store/store";
import { getModel } from "../types/models";

const proxyURL = "http://localhost:3000/message";

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
  const response = await fetch(proxyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model.APIName,
      messages: [
        ...useChatsStore.getState().chats.allChats[currentChatId].messages,
        { "role": "user", "content": String(message) },
      ],
    }),
  });

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

export async function suggestTitle(chatID: string) {
  const chatMessages = useChatsStore.getState().chats.allChats[chatID].messages;
  const modelKey = useChatsStore.getState().chats.allChats[chatID].modelKey;
  const setTitleTip = useChatsStore.getState().setTitleTip;
  const setTitleTipStatus = useChatsStore.getState().setTitleTipStatus;
  if (modelKey === null) return;
  const model = getModel(modelKey);

  setTitleTipStatus(chatID, "fetching");

  const response = await fetch(proxyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model.APIName,
      messages: [
        ...chatMessages,
        {
          "role": "user",
          "content":
            "Give one short neutral title(2-4 words) to our conversation. Send only it and nothing more.",
        },
      ],
    }),
  });

  if (!response.ok) {
    console.log("ERROR: ", response);
    setTitleTipStatus(chatID, "error");
    return;
  }

  const data = await response.json();
  setTitleTipStatus(chatID, "notApplied");
  setTitleTip(chatID, data.choices[0].message.content);
}
