import { mongoose } from "mongoose";

export async function connectDB(stringConnection) {
	try {
		await mongoose.connect(stringConnection)
		console.log("Conexión establecida con la base de datos")
	} catch (e) {
		console.error("No se pudo conectar a la base de datos: ", e.message)
		// Mato el proceso porque este model debe estar
		// estrictamente conectado a una DB
		process.exit(1)
	}
}
