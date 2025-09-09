import useChatsStore from "../store/store";
import { getModel } from "../types/models";
import { Message } from "../types/chat";

import { messageToAPIObject } from "../utils/api";
import { nanoid } from "nanoid";

const proxyURL = import.meta.env.VITE_PROXY_URL;

export async function sendMessage(currentChatId: string) {
  const setStatus = useChatsStore.getState().setStatus;
  const addMessage = useChatsStore.getState().addMessage;
  const setDraftMessage = useChatsStore.getState().setDraftMessage;
  const setDraftFiles = useChatsStore.getState().setDraftFiles;

  const modelKey =
    useChatsStore.getState().chats.allChats[currentChatId].modelKey;
  if (modelKey === null) {
    return;
  }
  const model = getModel(modelKey);

  const messages = useChatsStore
    .getState()
    .chats.allChats[
      currentChatId
    ].messages.map((message) => messageToAPIObject(message));
  const newMessage: Message = {
    role: "user",
    content:
      useChatsStore.getState().chats.allChats[currentChatId].draftMessage,
    id: nanoid(),
    files: useChatsStore.getState().chats.allChats[currentChatId].draftFiles,
  };
  messages.push(messageToAPIObject(newMessage));

  setStatus(currentChatId, "fetching");
  const response = await fetch(proxyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-token": "publictoken",
    },
    body: JSON.stringify({
      model: model.APIName,
      messages: messages,
    }),
  });

  if (!response.ok) {
    console.log("ERROR: ", response);
    setStatus(currentChatId, "error");
    return;
  }

  const data = await response.json();

  if (!data.choices) {
    console.log("No answer generated: ", data);
    setStatus(currentChatId, "error");
    return;
  }

  addMessage(
    currentChatId,
    "user",
    useChatsStore.getState().chats.allChats[currentChatId].draftMessage,
    useChatsStore.getState().chats.allChats[currentChatId].draftFiles,
  );
  addMessage(currentChatId, "assistant", data.choices[0].message.content);
  setStatus(currentChatId, "idle");
  setDraftMessage(currentChatId, "");
  setDraftFiles(currentChatId, []);
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
      "x-client-token": "publictoken",
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

  if (!data.choices) {
    console.log("No answer generated: ", data);
    setTitleTipStatus(chatID, "error");
    return;
  }

  setTitleTipStatus(chatID, "notApplied");
  setTitleTip(chatID, data.choices[0].message.content);
}
