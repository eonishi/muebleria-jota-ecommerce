import { json } from "express"
import { AppError } from "../errors/error.js"

const jsonParser = json()
export function handleJSON(req, res, next) {
  jsonParser(req, res, (err) => {
    const message = "Invalid JSON " + err?.message.slice(err?.message.indexOf("at"))
    err ? next(new AppError(message, 400)) : next()
  })
}
