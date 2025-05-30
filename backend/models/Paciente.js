const mongoose = require("mongoose");

const PacienteSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Nome obrigatorio"],
      trim: true,
    },
    telefone: {
      type: String,
      required: false,
      match: [/^\d{10,11}$/, "Apenas numeros, 10 ou 11 digitos"],
    },
    Admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Paciente", PacienteSchema);
