// Este middleware adjunta a la request los datos del cliente.
// Y es una gate entre el rol que tiene y el rol permitido.
// Los datos los lee desde la cookie (debe ejecutarse después del cookieparser)
import { verifyToken } from "../utils/jwt.js";

// TODO: importar el nombre desde un archivo de configuración común entre modulos
// Este debe ser el mismo nombre que se asigna en controllers/auth.js
const ACCESS_TOKEN_NAME = 'access_token'

export function permission(...permittedRoles) {
  return (req, res, next) => {
    const forbidden = () => { res.status(403).send("Forbidden") }

    // Si no hay cookie no tiene sentido evaluar permisos
    if (!req.cookies[ACCESS_TOKEN_NAME]) { return forbidden() }

    // Obtengo la info del user y lo adjunto a la req
    try {
      const userData = verifyToken(req.cookies[ACCESS_TOKEN_NAME])
      req.user = userData
      console.log(userData)
    } catch (e) {
      console.log("estoy entrando al catch")
      return forbidden()
    }

    // comparamos permisos del user contra permisos del middleware
    if (req.user && permittedRoles.includes(req.user.role)) {
      return next()
    } else {
      return forbidden()
    }
  }

}
