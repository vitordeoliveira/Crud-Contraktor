const { Schema, model } = require("mongoose");

const ContractSchema = new Schema(
  {
    // Contrato considerar o ti­tulo, as datas de inicio e vencimento
    //e o arquivo em PDF/ DOC do contrato
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    titulo: {
      type: String,
      required: true
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
      required: true
    },
    doc: {
      type: Object,
      required: true
    },
    partes: [
      {
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
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model("contrato", ContractSchema);
