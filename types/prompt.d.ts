import { Types } from "mongoose";
import { Document } from "mongodb";

export interface IPrompt extends Document {
  creator: Types.ObjectId;
  prompt: string;
  tag: string;
}

export interface ICreatePromptRequestBody {
  userId: Types.ObjectId | string;
  prompt: string;
  tag: string;
}
