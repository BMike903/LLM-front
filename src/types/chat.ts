import { modelsTypes } from "./models";

export type Roles = "user" | "assistant";

export type Message = {
  role: Roles;
  content: string;
  id: string;
};

export type Chat = {
  model: modelsTypes;
  messages: Array<Message>;
  status: LoadingStatuses;
  startDate: Date;
};

export type Chats = {
  currentChatId: string;
  allChats: {
    [chatId: string]: Chat;
  };
};

export type LoadingStatuses = "idle" | "fetching" | "error";
