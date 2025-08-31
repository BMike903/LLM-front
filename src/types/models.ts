import { models } from "../constants/models";

type Features = "img" | "file";

export type Model = {
  name: string;
  APIName: string;
  description: string;
  features?: Features[];
};

export type ModelsList = Record<string, Model>;

export type ModelsKey = keyof typeof models;

export function getModel(key: ModelsKey): Model {
  return models[key];
}
