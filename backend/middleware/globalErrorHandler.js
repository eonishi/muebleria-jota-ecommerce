import { APP_MODE } from "../config.js"
import { AppError } from "../errors/error.js"

export function globalErrorHandler(err, req, res, next) {
  // Control si es una excepcion no controlada ni esperada (via de escape para errores de capa 8 🤷‍♂️)
  if (!(err instanceof AppError)) {
    console.error("[ UNHADLED ERROR ]", err)
    err = new AppError(
      "Algo salió mal. Por favor, intente de nuevo más tarde",
      500
    )
  }

  const response = {
    status: err.status,
    statusCode: err.statusCode ? err.statusCode : 500,
    message:
      err.statusCode === 500
        ? "Algo salió mal. Por favor, intente de nuevo más tarde"
        : err.message,
  }

  //if (APP_MODE === "dev") {
  // Si estoy en dev mode voy a devolver el stack trace para ver qué falló
  // Agrega mucho ruido, dudando si dejarlo 🤔
  //	response.stack = err.stack
  //}

  res.status(err.statusCode).json(response)
}
