import { modelsTypes } from "./models";

export type Message = {
    role: "user" | "assistant";
    content: string;
    id: string;
};

export type Chat = {
    model: modelsTypes;
    messages: Array<Message>;
    status: "idle" | "fetching" | "fetched" | "error";
    startDate: Date;
};
