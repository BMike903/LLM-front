import { ModelsList } from "../types/models";

export const models: ModelsList = {
  /* "llama-4": {
    name: "LLAMA-4 SCOUT",
    APIName: "meta-llama/llama-4-scout:free",
    description:
      "Llama is a Meta-designed conversational model that adapts to a wide range of interaction styles. With a focus on flexibility and responsiveness, Llama provides quick and accurate answers, engages in in-depth discussions, and facilitates creative exchanges, making it a versatile tool for various conversational needs.",
  }, */
  "mai-ds": {
    name: "Microsoft AI DS-R1",
    APIName: "microsoft/mai-ds-r1:free",
    description:
      "MAI-DS-R1 is a DeepSeek-R1 reasoning model that has been post-trained by the Microsoft AI team to improve its responsiveness on blocked topics and its risk profile, while maintaining its reasoning capabilities and competitive performance. ",
  },
  "ds-r1": {
    name: "Deepseek R1",
    APIName: "deepseek/deepseek-r1-0528:free",
    description:
      "DeepSeek-R1 is a large language model developed by DeepSeek, an AI research company. The model is designed to assist with tasks such as text generation, language understanding, problem-solving, and document analysis. ",
  },
  "gemma-3n": {
    name: "Google Gemma",
    APIName: "google/gemma-3n-e4b-it:free",
    description:
      "Gemma is a large language model created by Google DeepMind and released as an open-weights AI assistant. It processes both text and images to generate text-based responses, operating without access to external tools or real-time information.",
  },
  "Qwen-QwQ": {
    name: "Qwen QwQ",
    APIName: "qwen/qwq-32b:free",
    description:
      "Qwen is a large language model developed by Alibaba Cloud, designed to provide information, answer questions, and assist with tasks across various subjects. Trained on data up to July 2024, it supports multilingual communication and operates without personal experiences or self-awareness.",
  },
  "Kimi-K2": {
    name: "Kimi K2",
    APIName: "moonshotai/kimi-k2:free",
    description:
      "Kimi K2 is a large language model trained by Moonshot AI with knowledge updated to April 2025. It excels in accurate reasoning, fluent text generation, and provides helpful guidance across a wide range of subjects. Kimi communicates clearly in multiple languages, adopting an informative yet approachable tone.",
  },
  /* "Gemini-2.5-img": {
    name: "Gemini 2.5 Image",
    APIName: "google/gemini-2.5-flash-image-preview:free",
    description:
      "Gemini 2.5 Flash, is a large language model from Google. It is designed to be a helpful and informative AI assistant, capable of understanding and generating human-like text to answer questions and complete various tasks. One of its key features is the ability to generate and modify images based on user requests, enhancing its responses with visual content.",
    features: ["img"],
  }, */
  "Llama-4-Scout ": {
    name: "Llama 4 Scout ",
    APIName: "meta-llama/llama-4-scout:free",
    description: "descr",
    features: ["img"],
  },
} as const;
