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
      type: Boolean,
      required: true
    },
    partes: [
      {
        type: Schema.Types.ObjectId,
        rel: "user"
      }
    ],
    waiting: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model("contrato", ContractSchema);
