import useChatsStore from "./store";

export const useCurrentChat = () =>
  useChatsStore((state) => state.chats.allChats[state.chats.currentChatId]);

export const useCurrentChatId = () =>
  useChatsStore((state) => state.chats.currentChatId);

export const useAllChats = () => useChatsStore((state) => state.chats.allChats);
