import { create } from "zustand";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";

import { Roles, Chats, LoadingStatuses } from "./types/chat";
import {
  planetsChatMessages,
  aircraftChatMessages,
} from "./constants/preMadeChats";

interface StoreState {
  chats: Chats;
  addMessage: (chatID: string, role: Roles, message: string) => void;
  setStatus: (chatID: string, newStatus: LoadingStatuses) => void;
  setCurrentChat: (chatID: string) => void;
  addNewChat: () => void;
}

const useChatsStore = create<StoreState>()(
  immer((set) => ({
    chats: {
      allChats: {
        "V1StGXR8_Z5jdHi6B-myT": {
          status: "idle",
          model: { name: "MAI-DS", APIName: "microsoft/mai-ds-r1:free" },
          startDate: new Date(),
          messages: [...planetsChatMessages],
        },
        "fuhlDw1udJPnvznJB7tzN": {
          status: "idle",
          model: { name: "LLAMA-4", APIName: "meta-llama/llama-4-scout:free" },
          startDate: new Date(),
          messages: [...aircraftChatMessages],
        },
      },
      currentChatId: "V1StGXR8_Z5jdHi6B-myT",
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
          model: { name: "LLAMA-4", APIName: "meta-llama/llama-4-scout:free" },
          messages: [],
          startDate: new Date(),
        };
        state.chats.currentChatId = newChatId;
      });
      return newChatId;
    },
  })),
);

export const useCurrentChat = () =>
  useChatsStore((state) => state.chats.allChats[state.chats.currentChatId]);

export const useCurrentChatId = () =>
  useChatsStore((state) => state.chats.currentChatId);

export const useAllChats = () => useChatsStore((state) => state.chats.allChats);

export default useChatsStore;
