import useChatsStore from "../store/store";
import { getModel } from "../types/models";
import { Message } from "../types/chat";

import { messageToAPIObject } from "../utils/api";
import { nanoid } from "nanoid";

const proxyURL = import.meta.env.VITE_PROXY_URL;

export async function sendMessage(currentChatId: string) {
  const store = useChatsStore.getState();
  const { setStatus, addMessage, setDraftMessage, setDraftFiles, chats } =
    store;
  const chat = chats.allChats[currentChatId];
  const { modelKey, draftMessage, draftFiles, messages } = chat;

  if (!modelKey) return;
  const model = getModel(modelKey);

  const apiMessages = messages.map(messageToAPIObject);
  const newMessage: Message = {
    role: "user",
    content: draftMessage,
    id: nanoid(),
    files: draftFiles,
  };
  apiMessages.push(messageToAPIObject(newMessage));

  setStatus(currentChatId, "fetching");

  try {
    const response = await fetch(proxyURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-token": "publictoken",
      },
      body: JSON.stringify({
        model: model.APIName,
        messages: apiMessages,
      }),
    });

    if (!response.ok) throw new Error("Network error");

    const data = await response.json();
    if (!data.choices) throw new Error("No answer generated");

    addMessage(currentChatId, "user", draftMessage, draftFiles);
    addMessage(currentChatId, "assistant", data.choices[0].message.content);
    setStatus(currentChatId, "idle");
    setDraftMessage(currentChatId, "");
    setDraftFiles(currentChatId, []);
  } catch (error) {
    console.error(error);
    setStatus(currentChatId, "error");
  }
}

export async function suggestTitle(chatID: string) {
  const store = useChatsStore.getState();
  const { chats, setTitleTip, setTitleTipStatus } = store;
  const chat = chats.allChats[chatID];
  const { messages, modelKey } = chat;
  if (!modelKey) return;
  const model = getModel(modelKey);

  setTitleTipStatus(chatID, "fetching");

  try {
    const response = await fetch(proxyURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-token": "publictoken",
      },
      body: JSON.stringify({
        model: model.APIName,
        messages: [
          ...messages,
          {
            role: "user",
            content:
              "Give one short neutral title(2-4 words) to our conversation. Send only it and nothing more.",
          },
        ],
      }),
    });

    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    if (!data.choices) throw new Error("No answer generated");

    setTitleTipStatus(chatID, "notApplied");
    setTitleTip(chatID, data.choices[0].message.content);
  } catch (error) {
    console.error(error);
    setTitleTipStatus(chatID, "error");
  }
}
