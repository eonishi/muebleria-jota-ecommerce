import { Router, static as static_ } from "express";

export const clientRouter = Router();

const clientPath = "../client/dist";

clientRouter.use("/", static_(clientPath, {
  maxAge: "1h", // El navegador puede cachear los archivos por 1 hora
}));

clientRouter.get("/{*splat}", (req, res) => {
  res.sendFile("index.html", { root: clientPath });
});
