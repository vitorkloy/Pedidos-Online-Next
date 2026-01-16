import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://root:mongo211023@mongodb.hfi0yre.mongodb.net/pedidos-online?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error("Por favor, defina a variável de ambiente MONGODB_URI");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("🚀 MongoDB conectado com sucesso!");
      return mongoose;
    }).catch((error) => {
      console.error("❌ Erro ao conectar ao MongoDB:", error.message);
      console.error("\n💡 SOLUÇÃO:");
      console.error("1. Verifique se o MongoDB está rodando:");
      console.error("   Windows: net start MongoDB");
      console.error("   Linux/Mac: sudo systemctl start mongod");
      console.error("2. Ou use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas");
      console.error("3. Configure MONGODB_URI no arquivo .env.local\n");
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
