import { Document } from "mongodb";

export interface IPrompt extends Document {
  creator: Types.ObjectId;
  prompt: string;
  tag: string;
}