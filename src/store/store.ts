import { create } from "zustand";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";

import { Roles, Chats, LoadingStatuses } from "../types/chat";
import {
  planetsChatMessages,
  aircraftChatMessages,
} from "../constants/preMadeChats";
import { ModelsKey } from "../types/models";

interface StoreState {
  chats: Chats;
  addMessage: (chatID: string, role: Roles, message: string) => void;
  setStatus: (chatID: string, newStatus: LoadingStatuses) => void;
  setCurrentChat: (chatID: string) => void;
  addNewChat: () => void;
  setModel: (chatID: string, model: ModelsKey) => void;
}

const useChatsStore = create<StoreState>()(
  immer((set) => ({
    chats: {
      allChats: {
        "XkBlzJPRrmBMfZYCe_-HF": {
          status: "idle",
          modelKey: null,
          startDate: new Date(),
          messages: [],
        },
        "V1StGXR8_Z5jdHi6B-myT": {
          status: "idle",
          modelKey: "mai-ds",
          startDate: new Date(),
          messages: [...planetsChatMessages],
        },
        "fuhlDw1udJPnvznJB7tzN": {
          status: "idle",
          modelKey: "llama-4",
          startDate: new Date(),
          messages: [...aircraftChatMessages],
        },
      },
      currentChatId: "XkBlzJPRrmBMfZYCe_-HF",
    },
    addMessage: (chatId, role, message) =>
      set((state) => {
        state.chats.allChats[chatId].messages.push({
          role: role,
          content: message,
          id: nanoid(),
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
          startDate: new Date(),
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
  })),
);

export default useChatsStore;
