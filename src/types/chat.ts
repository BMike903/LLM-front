import { ModelsKey } from "./models";

export type Roles = "user" | "assistant";

export type Message = {
  role: Roles;
  content: string;
  id: string;
};

export type FileTypes = "img" | "audio" | "file" | "video";

export type FileConversionResult =
  | { success: true; file: ChatFile }
  | { success: false; error: unknown; name?: string };

export type ChatFile = {
  id: string;
  fileType: FileTypes;
  file: string;
  name?: string;
};

export type Chat = {
  modelKey: ModelsKey | null;
  isSelectingModel: boolean;
  messages: Array<Message>;
  status: LoadingStatuses;
  startDate: string;
  draftMessage: string;
  draftFiles: ChatFile[];
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

export type ChatPreview = Omit<
  Chat,
  "messages" | "draftMessage" | "titleTip" | "isSelectingModel"
> & {
  chatID: string;
  firstMessage?: string | null;
};
export type ChatsPreviewsByDates = {
  "weekAgo": ChatPreview[];
  "3daysAgo": ChatPreview[];
  "yesterday": ChatPreview[];
  "today": ChatPreview[];
};

export type LoadingStatuses = "idle" | "fetching" | "error";

export type TitleTipStatuses = "empty" | "fetching" | "error" | "notApplied";
