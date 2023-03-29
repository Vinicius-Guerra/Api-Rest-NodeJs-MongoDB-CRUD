import autores from "../models/autor.js";

class autorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      
      res.status(200).json(autoresResultado);
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor"});
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    const id = req.params.id;
    try {
      const autorResultado = await autores.findById(id);
      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        res.status(404).send({message: "Id do autor náo localizado."});
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req,res, next) => {
    let autor = new autores(req.body);
    try {
      const autorResultado = await autor.save();
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "autor atualizado com sucesso."});
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req,res, next) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "autor removido com sucesso"});
    } catch (erro) {
      next(erro);
    }
  };
}

export default autorController;