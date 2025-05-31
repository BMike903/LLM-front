import { models } from "../constants/models";

export type Model = {
  name: string;
  APIName: string;
};

export type modelsTypes = (typeof models)[number];
