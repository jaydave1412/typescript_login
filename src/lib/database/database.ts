import mongoose from "mongoose";

export async function connect(uri = process.env.MONGODB_URI) {
  try {
    console.log(uri);
    mongoose.connect(uri);
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB error" + err);
      process.exit();
    });
  } catch (error: any) {
    console.log(error);
  }
}
