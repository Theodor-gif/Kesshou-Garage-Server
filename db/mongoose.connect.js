import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL);
    console.log("connected to DB", connect.connections[0].name);
  } catch (error) {
    console.log("Not connected to DB", error);
  }
}
