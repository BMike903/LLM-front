import { models } from "../constants/models";

export type Model = {
  name: string;
  APIName: string;
};

export type ModelsList = Record<string, Model>;

export type modelsTypes = (typeof models)[number];
