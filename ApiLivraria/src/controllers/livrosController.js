import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    } 
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

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
    try {
      let livro = new livros(req.body);

      const livroResultados = await livro.save();
      res.status(201).send(livroResultados.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

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
    try {
      const id = req.params.id;

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
      const busca = await processaBusca(req.query);

      if(busca !== null) {
        const livrosResultado =  livros
          .find(busca)
          .populate("autor");

        req.resultado = livrosResultado;

        next();
  
        if(livrosResultado !== null) {
          res.status(200).send(livrosResultado);
        } else {
          next(NaoEncontrado("Id do livro nao encontrado"));
        }
      } else{
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }

  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  //gte = maior ou igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  //lte = menor ou igual que
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if(autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }

  }

  return busca;
}

export default LivroController;