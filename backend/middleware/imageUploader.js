import multer from "multer"
import { APP_MODE } from "../config.js"
import { AppError } from "../errors/error.js"

// Dependiendo de si estamos en dev o prod, guardo las imagenes donde el clente pueda accederlas
let destination = "../client/public/assets/"
if (APP_MODE === "prod") {
	destination = "../dist/assets/"
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, destination)
	},
	filename: function (req, file, cb) {
		const timestamp = Date.now()
		const productName = req.body.product_name
		const extension = file.originalname.split(".").slice(-1)
		cb(null, `${timestamp}-${productName}.${extension}`)
	},
})

function filterMimeTypes(req, file, cb) {
	if (!file.mimetype.startsWith("image/")) {
		cb(new AppError("Invalid file type", 400), false)
	}
	cb(null, true)
}

const imageUploader = multer({
	storage: storage,
	fileFilter: filterMimeTypes,
}).single("imagen")

export function handlerImageUploader(req, res, next) {
	// Esto gestiona la carga de la imagen al servidor
	// Además, parsea el form-data para que los campos puedan ser leidos desde req.body
  imageUploader(req, res, (err) => {
		err ? next(new AppError(err.message, 400)) : next()
	})
}
