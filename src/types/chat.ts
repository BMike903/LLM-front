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
  draftMessage: string;
  title: string;
  titleTip: string;
  titleTipStatus: TitleTipStatuses;
};

export type Chats = {
  currentChatId: string;
  allChats: {
    [chatId: string]: Chat;
  };
};

export type ChatPreview = {
  chatID: string;
  firstMessage?: string | null;
  model?: string | null;
  startDate: string;
  status: LoadingStatuses;
  title: string;
};
export type ChatsPreviewsByDates = {
  "weekAgo": ChatPreview[];
  "3daysAgo": ChatPreview[];
  "yesterday": ChatPreview[];
  "today": ChatPreview[];
};

export type LoadingStatuses = "idle" | "fetching" | "error";

export type TitleTipStatuses = "empty" | "fetching" | "error" | "notApplied";
