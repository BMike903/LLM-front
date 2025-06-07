import { ModelsKey } from "./models";

export type Roles = "user" | "assistant";

export type Message = {
  role: Roles;
  content: string;
  id: string;
};

export type Chat = {
  modelKey: ModelsKey | null;
  messages: Array<Message>;
  status: LoadingStatuses;
  startDate: string;
};

export type Chats = {
  currentChatId: string;
  allChats: {
    [chatId: string]: Chat;
  };
};

export type LoadingStatuses = "idle" | "fetching" | "error";
