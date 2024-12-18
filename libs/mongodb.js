import mongoose from "mongoose";

let isConnected = false; // Track the connection status

const connectToDB = async () => {
  if (isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = connection.connections[0].readyState === 1;
    console.log("Connected to database");
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    throw new Error("Failed to connect to the database");
  }
};

export default connectToDB;
