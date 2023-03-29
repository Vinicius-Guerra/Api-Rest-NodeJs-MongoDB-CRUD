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

  static listarAutorPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const autorResultado = await autores.findById(id);
      res.status(200).send(autorResultado);
    } catch (erro) {
      res.status(400).send({message: `${erro.message} - Id do autor náo localizado.`});
    }
  };

  static cadastrarAutor = async (req,res) => {
    let autor = new autores(req.body);
    try {
      const autorResultado = await autor.save();
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      res.status(500).send({message: `${erro.message} - Falha ao cadastrar o autor.`});
    }
  };

  static atualizarAutor = async (req, res) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "autor atualizado com sucesso."});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };

  static excluirAutor = async (req,res) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "autor removido com sucesso"});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };
}

export default autorController;