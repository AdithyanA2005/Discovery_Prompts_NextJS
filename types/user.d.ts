import { Document } from "mongodb";

export interface IUser extends Document {
  name: string;
  image: string;
  email: string;
  promptCount: number;
}
