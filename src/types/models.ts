import { models } from "../constants/models";

export type Model = {
  name: string;
  APIName: string;
};

export type ModelsList = Record<string, Model>;

export type ModelsKey = keyof typeof models;

export function getModel(key: ModelsKey): Model {
  return models[key];
}
