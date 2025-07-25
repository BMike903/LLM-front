import { create } from "zustand";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

import { Roles, Chats, LoadingStatuses, TitleTipStatuses } from "../types/chat";
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
  addMessage: (chatID: string, role: Roles, message: string) => void;
  setStatus: (chatID: string, newStatus: LoadingStatuses) => void;
  setCurrentChat: (chatID: string) => void;
  addNewChat: () => void;
  setModel: (chatID: string, model: ModelsKey) => void;
  setDraftMessage: (chatID: string, draftMessage: string) => void;
  setTitle: (chatID: string, newTitle: string) => void;
  setTitleTip: (chatID: string, titleTip: string) => void;
  setTitleTipStatus: (chatID: string, status: TitleTipStatuses) => void;
  setSelectingModel: (chatID: string, isSelectingModel: boolean) => void;
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
            title: "Planetary Order",
            titleTip: "",
            titleTipStatus: "empty",
            isSelectingModel: false,
          },
          "fuhlDw1udJPnvznJB7tzN": {
            status: "idle",
            modelKey: "llama-4",
            startDate: getRandomTimeFromPastDays(15).toISOString(),
            messages: [...zustandChatMessages],
            draftMessage: "",
            title: "Zustand State Management",
            titleTip: "",
            titleTipStatus: "empty",
            isSelectingModel: false,
          },
          "fV3CTpvaQfWfHIjMxfzUo": {
            status: "idle",
            modelKey: "llama-4",
            startDate: getRandomTimeFromPastDays(2).toISOString(),
            messages: [...pancakeChatMessages],
            draftMessage: "",
            title: "",
            titleTip: "",
            titleTipStatus: "empty",
            isSelectingModel: false,
          },
          "8BNMAhGSD5ulJUdgXdyZB": {
            status: "idle",
            modelKey: "llama-4",
            startDate: getRandomTimeFromPastDays(1).toISOString(),
            messages: [...laptopChatMessages],
            draftMessage: "",
            title: "",
            titleTip: "",
            titleTipStatus: "empty",
            isSelectingModel: false,
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
            draftMessage: "",
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
    })),
  ),
);

export default useChatsStore;
