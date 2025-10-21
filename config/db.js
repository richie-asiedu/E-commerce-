import mongoose from "mongoose";

// Use a stable global cache to avoid creating multiple connections in dev
const globalWithMongoose = globalThis;
if (!globalWithMongoose.__mongoose) {
    globalWithMongoose.__mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.__mongoose;

async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            // other recommended options can go here
        };

        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('MONGODB_URI is not set in environment');

        // Connect and return the mongoose connection
        cached.promise = mongoose.connect(`${uri}/quickcart`, opts).then((mongooseInstance) => {
            return mongooseInstance.connection;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;