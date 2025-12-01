import cors from 'cors'
import { APP_MODE } from '../config.js'

const WHITE_LIST = ["https://muebleria.eonishi.dev"]
const DEV_WHITE_LIST = ["http://localhost:5173"]
export const Cors = cors({
  origin: APP_MODE === 'prod' ? WHITE_LIST : DEV_WHITE_LIST,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
})


