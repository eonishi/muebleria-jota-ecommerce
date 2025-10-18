import multer from "multer";
import { APP_MODE } from "../config.js";

// Dependiendo de si estamos en dev o prod, guardo las imagenes donde el clente pueda accederlas
let destination = "../client/public/assets/";
if (APP_MODE === "prod") {
  destination = "../dist/assets/";
}

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now()
    const productName = req.body.product_name;
    const extension = file.originalname.split(".").slice(-1);
    cb(null, `${timestamp}-${productName}.${extension}`);
  },
});

function filterMimeTypes (req, file, cb) {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Invalid file type"), false);
  }
  cb(null, true);
}

export const imageUploader = multer({
  storage: storage,
  fileFilter: filterMimeTypes,
});
