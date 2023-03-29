import livros from "../models/livro.js";

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
      res.status(200).send(livroResultados);
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
      await livros.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Livro atualizado com sucesso."});
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req,res, next) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({message: "Livro removido com sucesso"});
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    const editora = req.query.editora;
    try {
      const livrosResultado = await livros.find({"editora": editora});
      res.status(200).send(livrosResultado);
    } catch (erro) {
      next(erro);
    }

  };
}

export default LivroController;