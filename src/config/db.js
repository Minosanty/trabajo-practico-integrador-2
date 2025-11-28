import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/mydatabase2");
        console.log("Conexión exitosa de la base de datos");
    } catch (error) {
        console.log("No se pudo conectar a la base de datos", error);
    }
};