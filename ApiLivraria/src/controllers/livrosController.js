import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    } 
  };

  static listarLivroPorId = async (req, res, next) => {
    const id = req.params.id;
    try {
      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NaoEncontrado("Id do livro nao encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req,res, next) => {
    let livro = new livros(req.body);
    try {
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    const id = req.params.id;
    try {
      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});
      if(livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso."});
      } else {
        next(NaoEncontrado("Id do autor nao encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req,res, next) => {
    const id = req.params.id;
    try {
      const livroResultado = await livros.findByIdAndDelete(id);
      if(livroResultado !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(NaoEncontrado("Id do livro nao encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const {editora, titulo} = req.query;

      const busca = {};

      if(editora) busca.editora =editora;
      if(titulo) busca.titulo=titulo;

      const livrosResultado = await livros.find(busca);
      if(livrosResultado !== null) {
        res.status(200).send(livrosResultado);
      } else {
        next(NaoEncontrado("Id do livro nao encontrado"));
      }
    } catch (erro) {
      next(erro);
    }

  };
}

export default LivroController;