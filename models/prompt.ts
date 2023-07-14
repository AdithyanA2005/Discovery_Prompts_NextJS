import { Document } from "mongodb";
import { Model, Schema, Types, model, models } from "mongoose";

export interface IPrompt extends Document {
  creator: Types.ObjectId;
  prompt: string;
  tag: string;
}

const promptSchema: Schema<IPrompt> = new Schema<IPrompt>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  }
});

const Prompt: Model<IPrompt> = models.Prompt || model("Prompt", promptSchema);
export default Prompt;