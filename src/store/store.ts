import { create } from "zustand";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

import {
  Roles,
  Chats,
  LoadingStatuses,
  TitleTipStatuses,
  ChatFile,
} from "../types/chat";
import {
  planetsChatMessages,
  zustandChatMessages,
  pancakeChatMessages,
  laptopChatMessages,
} from "../constants/preMadeChats";
import { ModelsKey } from "../types/models";
import { getRandomTimeFromPastDays } from "../utils/date";

interface StoreState {
  chats: Chats;
  addMessage: (
    chatID: string,
    role: Roles,
    message: string,
    files?: ChatFile[],
  ) => void;
  setStatus: (chatID: string, newStatus: LoadingStatuses) => void;
  setCurrentChat: (chatID: string) => void;
  addNewChat: () => void;
  setModel: (chatID: string, model: ModelsKey) => void;
  setDraftMessage: (chatID: string, draftMessage: string) => void;
  setTitle: (chatID: string, newTitle: string) => void;
  setTitleTip: (chatID: string, titleTip: string) => void;
  setTitleTipStatus: (chatID: string, status: TitleTipStatuses) => void;
  setSelectingModel: (chatID: string, isSelectingModel: boolean) => void;
  setDraftFiles: (chatID: string, draftFiles: ChatFile[]) => void;
  deleteChat: (chatID: string) => void;
  deleteMessage: (chatID: string, messageID: string) => void;
}

const useChatsStore = create<StoreState>()(
  devtools(
    immer((set) => ({
      chats: {
        allChats: {
          "XkBlzJPRrmBMfZYCe_-HF": {
            status: "idle",
            modelKey: null,
            startDate: new Date().toISOString(),
            messages: [],
            draftMessage: "",
            draftFiles: [],
            title: "",
            titleTip: "",
            titleTipStatus: "empty",
            isSelectingModel: true,
          },
          "V1StGXR8_Z5jdHi6B-myT": {
            status: "idle",
            modelKey: "mai-ds",
            startDate: getRandomTimeFromPastDays(3).toISOString(),
            messages: [...planetsChatMessages],
            draftMessage: "Yes",
            draftFiles: [],
            title: "Planetary Order",
            titleTip: "",
            titleTipStatus: "empty",
            isSelectingModel: false,
          },
          "fuhlDw1udJPnvznJB7tzN": {
            status: "idle",
            modelKey: "Qwen-QwQ",
            startDate: getRandomTimeFromPastDays(15).toISOString(),
            messages: [...zustandChatMessages],
            draftMessage: "",
            draftFiles: [],
            title: "Zustand State Management",
            titleTip: "",
            titleTipStatus: "empty",
            isSelectingModel: false,
          },
          "fV3CTpvaQfWfHIjMxfzUo": {
            status: "idle",
            modelKey: "Kimi-K2",
            startDate: getRandomTimeFromPastDays(2).toISOString(),
            messages: [...pancakeChatMessages],
            draftMessage: "",
            draftFiles: [],
            title: "",
            titleTip: "",
            titleTipStatus: "empty",
            isSelectingModel: false,
          },
          "8BNMAhGSD5ulJUdgXdyZB": {
            status: "idle",
            modelKey: "ds-r1",
            startDate: getRandomTimeFromPastDays(1).toISOString(),
            messages: [...laptopChatMessages],
            draftMessage: "",
            draftFiles: [],
            title: "",
            titleTip: "",
            titleTipStatus: "empty",
            isSelectingModel: false,
          },
        },
        currentChatId: "XkBlzJPRrmBMfZYCe_-HF",
      },
      addMessage: (chatId, role, message, files) =>
        set((state) => {
          state.chats.allChats[chatId].messages.push({
            role: role,
            content: message,
            id: nanoid(),
            files: files,
          });
        }),
      setStatus: (chatId, newStatus) =>
        set((state) => {
          state.chats.allChats[chatId].status = newStatus;
        }),
      setCurrentChat: (chatId) =>
        set((state) => {
          state.chats.currentChatId = chatId;
        }),
      addNewChat: () => {
        const newChatId = nanoid();
        set((state) => {
          state.chats.allChats[newChatId] = {
            status: "idle",
            modelKey: null,
            messages: [],
            startDate: new Date().toISOString(),
            draftMessage: "",
            draftFiles: [],
            title: "",
            titleTip: "",
            titleTipStatus: "empty",
            isSelectingModel: true,
          };
          state.chats.currentChatId = newChatId;
        });
        return newChatId;
      },
      setModel(chatID, model) {
        set((state) => {
          state.chats.allChats[chatID].modelKey = model;
        });
      },
      setDraftMessage(chatID, draftMessage) {
        set((state) => {
          state.chats.allChats[chatID].draftMessage = draftMessage;
        });
      },
      setTitle(chatID, newTitle) {
        set((state) => {
          state.chats.allChats[chatID].title = newTitle;
        });
      },
      setTitleTipStatus(chatID, status) {
        set((state) => {
          state.chats.allChats[chatID].titleTipStatus = status;
        });
      },
      setTitleTip(chatID, titleTip) {
        set((state) => {
          state.chats.allChats[chatID].titleTip = titleTip;
        });
      },
      setSelectingModel(chatID, isSelectingModel) {
        set((state) => {
          state.chats.allChats[chatID].isSelectingModel = isSelectingModel;
        });
      },
      setDraftFiles(chatID, draftFiles) {
        set((state) => {
          state.chats.allChats[chatID].draftFiles = [...draftFiles];
        });
      },
      deleteMessage(chatID, messageID) {
        set((state) => {
          const messages = state.chats.allChats[chatID]?.messages;
          if (!messages) return;

          const idx = messages.findIndex((m) => m.id === messageID);
          if (idx === -1) return;

          const deleted = messages[idx];
          messages.splice(idx, 1);

          // if it was a user message, and the next message was assistant, remove it too
          if (deleted.role === "user") {
            if (idx < messages.length && messages[idx]?.role === "assistant") {
              messages.splice(idx, 1);
            }
          }
        });
      },
      deleteChat(chatID) {
        set((state) => {
          delete state.chats.allChats[chatID];

          if (state.chats.currentChatId === chatID) {
            const remaining = Object.keys(state.chats.allChats);
            if (remaining.length > 0) {
              state.chats.currentChatId = remaining[0];
            } else {
              const newChatId = nanoid();
              state.chats.allChats[newChatId] = {
                status: "idle",
                modelKey: null,
                messages: [],
                startDate: new Date().toISOString(),
                draftMessage: "",
                draftFiles: [],
                title: "",
                titleTip: "",
                titleTipStatus: "empty",
                isSelectingModel: true,
              };
              state.chats.currentChatId = newChatId;
            }
          }
        });
      },
    })),
  ),
);

export default useChatsStore;
