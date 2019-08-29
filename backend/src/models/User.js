const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    // nome, sobrenome, email, CPF e telefone.
    nome: {
      type: String,
      required: true
    },
    sobrenome: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      required: true
    },
    telefone: {
      type: String,
      required: true
    },
    senha: {
      type: String,
      required: true
    },
    contratos: [
      {
        type: Schema.Types.ObjectId,
        ref: "contrato"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model("user", UserSchema);
