import mongoose, { ConnectOptions } from "mongoose";

// Track the connection status
let isConnected: boolean = false;

// Function to establish the connection
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  // Only continue if connection is not established
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  };

  try {
    // Try to connect to the database
    const connectOptions: ConnectOptions = { dbName: "prompts" };
    await mongoose.connect(process.env.MONGODB_URI || "", connectOptions);

    // After successful connection change the isConnected to true
    isConnected = true;
  } catch (error) {
    // Print any error that has occured
    console.log(error)
  }
}
