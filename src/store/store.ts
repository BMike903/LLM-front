import { create } from "zustand";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

import { Roles, Chats, LoadingStatuses } from "../types/chat";
import {
  planetsChatMessages,
  aircraftChatMessages,
  pancakeChatMessages,
  laptopChatMessages,
} from "../constants/preMadeChats";
import { ModelsKey } from "../types/models";
import { getRandomTimeFromPastDays } from "../utils/date";

interface StoreState {
  chats: Chats;
  addMessage: (chatID: string, role: Roles, message: string) => void;
  setStatus: (chatID: string, newStatus: LoadingStatuses) => void;
  setCurrentChat: (chatID: string) => void;
  addNewChat: () => void;
  setModel: (chatID: string, model: ModelsKey) => void;
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
          },
          "V1StGXR8_Z5jdHi6B-myT": {
            status: "idle",
            modelKey: "mai-ds",
            startDate: getRandomTimeFromPastDays(3).toISOString(),
            messages: [...planetsChatMessages],
          },
          "fuhlDw1udJPnvznJB7tzN": {
            status: "idle",
            modelKey: "llama-4",
            startDate: getRandomTimeFromPastDays(15).toISOString(),
            messages: [...aircraftChatMessages],
          },
          "fV3CTpvaQfWfHIjMxfzUo": {
            status: "idle",
            modelKey: "llama-4",
            startDate: getRandomTimeFromPastDays(2).toISOString(),
            messages: [...pancakeChatMessages],
          },
          "8BNMAhGSD5ulJUdgXdyZB": {
            status: "idle",
            modelKey: "llama-4",
            startDate: getRandomTimeFromPastDays(1).toISOString(),
            messages: [...laptopChatMessages],
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
            startDate: new Date().toISOString(),
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
  ),
);

export default useChatsStore;
