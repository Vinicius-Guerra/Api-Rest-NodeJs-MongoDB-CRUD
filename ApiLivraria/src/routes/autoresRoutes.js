import express from "express";
import autorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/autores", autorController.listarAutores, paginar)
  .get("/autores/:id", autorController.listarAutorPorId)
  .post("/autores", autorController.cadastrarAutor)
  .put("/autores/:id", autorController.atualizarAutor)
  .delete("/autores/:id", autorController.excluirAutor);
export default router;