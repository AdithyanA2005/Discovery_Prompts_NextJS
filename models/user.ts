import { Document } from "mongodb";
import { Model, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  image: string;
  email: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
});

const User: Model<IUser> = models.User || model("User", userSchema);
export default User;