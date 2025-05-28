import { create } from "zustand";
import { nanoid } from "nanoid";

import { modelsTypes } from "./types/models";
import { Message, LoadingStatuses, Roles } from "./types/chat";

interface StoreState {
  model: modelsTypes;
  messages: Array<Message>;
  status: LoadingStatuses;
  startDate: Date;
  addMessage: (role: Roles, message: string) => void;
  setStatus: (newStatus: LoadingStatuses) => void;
}

const useChatStore = create<StoreState>((set) => ({
  model: "meta-llama/llama-4-scout:free",
  messages: [],
  status: "idle",
  startDate: new Date(),
  addMessage: (role, message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { role: role, content: message, id: nanoid() },
      ],
    })),
  setStatus: (newStatus) =>
    set(() => ({
      status: newStatus,
    })),
}));

export default useChatStore;
