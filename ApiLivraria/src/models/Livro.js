import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String,
      required: [true, "O titulo do livro e obrigatorio."]},
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O autor é obrigatorio."]},
    editora: {
      type: String,
      required: [true, "A editora é obrigatoria"],
      enum: ["Casa do código", "Alura"]
    },
    numeroPaginas: {
      type: Number,
      min: [10, "O numero de paginas deve estar entre 10 e 5000"],
      max:[5000, "O numero de paginas deve estar entre 10 e 5000"]
    }
  }  
);

const livros = mongoose.model("livros", livroSchema);

export default livros;