import { ModelsList } from "../types/models";

export const models: ModelsList = {
  "llama-4": {
    name: "LLAMA-4 SCOUT",
    APIName: "meta-llama/llama-4-scout:free",
    description:
      "Llama is a Meta-designed conversational model that adapts to a wide range of interaction styles. With a focus on flexibility and responsiveness, Llama provides quick and accurate answers, engages in in-depth discussions, and facilitates creative exchanges, making it a versatile tool for various conversational needs.",
  },
  "mai-ds": {
    name: "MAI-DS R1",
    APIName: "microsoft/mai-ds-r1:free",
    description:
      "MAI-DS-R1 is a DeepSeek-R1 reasoning model that has been post-trained by the Microsoft AI team to improve its responsiveness on blocked topics and its risk profile, while maintaining its reasoning capabilities and competitive performance. ",
  },
  "ds-r1": {
    name: "DS R1",
    APIName: "deepseek/deepseek-r1-0528:free",
    description:
      "DeepSeek-R1 is a large language model developed by DeepSeek, an AI research company. The model is designed to assist with tasks such as text generation, language understanding, problem-solving, and document analysis. ",
  },
} as const;
