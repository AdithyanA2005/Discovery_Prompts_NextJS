import { Types } from "mongoose";
import { Document } from "mongodb";
import { IUser } from "./user";

export interface IPrompt extends Document {
  creator: Types.ObjectId;
  prompt: string;
  tag: string;
}

export interface IPromptWithCreatorPopulated extends IPrompt {
  creator: IUser;
};

export interface IWritePromptRequestBody {
  userId: Types.ObjectId | string;
  prompt: string;
  tag: string;
}
