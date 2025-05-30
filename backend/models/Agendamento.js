const mongoose = require("mongoose");
const Paciente = require("./Paciente");

const AgendamentoSchema = new mongoose.Schema(
  {
    paciente_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "Paciente  obrigatorio"],
    },
    especialidade: {
      type: String,
      required: [true, "Especialidade obrigatorio"],
      enum: ["Nutricionista", "Medico"],
    },
    dataHora: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const agora = new Date();
          const menos3Horas = new Date(agora.getTime() - 3 * 60 * 60 * 1000);
          return value > menos3Horas;
        },
        message: "Data e hora deve ser futura",
      },
    },
    status: {
      type: String,
      enum: ["pendente", "aprovado", "reprovado"],
      default: "pendente",
    },
  },
  { timestamps: true }
);

AgendamentoSchema.index(
  { paciente_id: 1, dataHora: 1 },
  { unique: true, name: "unique_agendamento" }
);

AgendamentoSchema.on("index", function (error) {
  if (error) console.log("Erro ao criar índice:", error);
  else console.log("Índice sucesso ");
});

module.exports = mongoose.model("Agendamento", AgendamentoSchema);
