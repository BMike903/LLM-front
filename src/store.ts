import { create } from "zustand";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";

import { Roles, Chats, LoadingStatuses } from "./types/chat";

interface StoreState {
  chats: Chats;
  addMessage: (chatID: string, role: Roles, message: string) => void;
  setStatus: (chatID: string, newStatus: LoadingStatuses) => void;
}

const useChatsStore = create<StoreState>()(
  immer((set) => ({
    chats: {
      allChats: {
        "V1StGXR8_Z5jdHi6B-myT": {
          status: "idle",
          model: "meta-llama/llama-4-scout:free",
          messages: [],
          startDate: new Date(),
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
  })),
);

export const useCurrentChat = () =>
  useChatsStore((state) => state.chats.allChats[state.chats.currentChatId]);

export default useChatsStore;
