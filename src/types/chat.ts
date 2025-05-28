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
  status: "idle" | "fetching" | "fetched" | "error";
  startDate: Date;
};

export type LoadingStatuses = "idle" | "fetching" | "error";
