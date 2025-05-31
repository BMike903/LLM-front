import { ModelsList } from "../types/models";

export const models: ModelsList = {
  "llama-4": { name: "LLAMA-4", APIName: "meta-llama/llama-4-scout:free" },
  "mai-ds": { name: "MAI-DS", APIName: "microsoft/mai-ds-r1:free" },
} as const;
