import mongoose from "mongoose";
const connection = {};

export async function connectDb() {
    if (connection.isConnected) {
        console.log("Already connected to database ");
        return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log("Use previous connectionto database");
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to database");
    connection.isConnected = db.connections[0].readyState;
}