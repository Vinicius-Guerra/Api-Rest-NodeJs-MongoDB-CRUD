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
      const autoresResultadoPorId = await autores.findById(id);
      res.status(200).send(autoresResultadoPorId);
    } catch (erro) {
      res.status(400).send({message: `${erro.message} - Id do autor náo localizado.`});
    }
  };

  static cadastrarAutor = async (req,res) => {
    let autor = new autores(req.body);
    try {
      let autorSalvo = await autor.save();
      res.status(201).send(autorSalvo.toJSON());
    } catch (erro) {
      res.status(500).send({message: `${erro.message} - Falha ao cadastrar o autor.`});
    }
  };

  static atualizarAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: "autor atualizado com sucesso."});
      } else {
        res.status(500).send({message: err.message});
      }
    });
  };

  static excluirAutor = (req,res) => {
    const id = req.params.id;

    autores.findByIdAndDelete(id, (err) => {
      if(!err) {
        res.status(200).send({message: "autor removido com sucesso"});
      } else {
        res.status(500).send({message: err.message});
      }
    });
  };
}

export default autorController;