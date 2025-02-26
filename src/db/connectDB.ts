import mongoose from "mongoose";
import { DB_URI } from "../../config/env";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
  } catch (error) {
    console.log({ ErrorInConnectDB: error });
    throw error;
  }
};

export default connectDB;
