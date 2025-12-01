export const {
  DB_CONNECTION_STRING = "mongodb://root:example@127.0.0.1:27017/",
  APP_MODE = "dev", // prod o dev
  JWT_SECRET = "NO OLVIDARSE DE COLOCAR UN SECRET MUY MUY LARGO Y COMPLEJO QUE GARANTIZE LA SEGURIDAD",
} = process.env
