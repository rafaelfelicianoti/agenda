const Agendamento = require("../models/Agendamento");
const Paciente = require("../models/Paciente");
const mongoose = require("mongoose");

//Cria agendamento
exports.createAgendamento = async (req, res) => {
  try {
    console.log("Dados recebidos:", req.body);
    const paciente = await Paciente.findById(req.body.paciente_id);
    if (!paciente) {
      return res.status(404).json({ error: "Paciente não existe" });
    }
    const agendamento = await Agendamento.create(req.body);
    res.status(201).json(agendamento);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lista agendamentos
exports.getAgendamentos = async (req, res) => {
  try {
    const { paciente_id } = req.query;

    // Utilizado nome do user  = admin e nao como superuser
    if (paciente_id === "admin") {
      const agendamentos = await Agendamento.find().populate("paciente_id");
      return res.json(agendamentos);
    }

    if (!mongoose.Types.ObjectId.isValid(paciente_id)) {
      return res.status(400).json({ error: "ID de paciente inválido" });
    }

    const paciente = await Paciente.findById(paciente_id);
    if (!paciente) {
      return res.status(404).json({ error: "Paciente não existe" });
    }

    // Retorna por paciente is
    const agendamentos = await Agendamento.find({ paciente_id }).populate(
      "paciente_id"
    );
    res.json(agendamentos);
  } catch (err) {
    console.error("Erro ao buscar agendamentos:", err.message);
    res.status(500).json({ error: err.message });
  }
};
// STATUS Aprova ou reprova um agendamento
exports.atualizarStatusAgendamento = async (req, res) => {
  try {
    const { agendamentoId } = req.params;
    const { status, paciente_id } = req.body;

    if (!["aprovado", "reprovado"].includes(status)) {
      return res.status(400).json({ error: "Status inválido" });
    }

    if (paciente_id !== "admin") {
      // Valida ObjectId antes de chamar findById
      if (!mongoose.Types.ObjectId.isValid(paciente_id)) {
        return res.status(400).json({ error: "ID de paciente invalido" });
      }

      const paciente = await Paciente.findById(paciente_id);
      if (!paciente) {
        return res.status(404).json({ error: "Paciente nao existe" });
      }

      return res
        .status(403)
        .json({ error: "Apenas admin pode alterar o status" });
    }

    const agendamento = await Agendamento.findByIdAndUpdate(
      agendamentoId,
      { status },
      { new: true }
    );

    if (!agendamento) {
      return res.status(404).json({ error: "Agendamento nao encontrado" });
    }

    res.json(agendamento);
  } catch (err) {
    console.error("Erro ao atualizar status:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Retorna horários disponíveis por data e especialidade
exports.getHorariosDisponiveis = async (req, res) => {
  try {
    const { data, especialidade } = req.query;
    if (!data || !especialidade) {
      return res.status(400).json({
        error: "data e especialidade obrigatorio",
      });
    }

    const horariosManuais = {
      Nutricionista: [
        "9:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
      ],
      Medico: [
        "9:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
      ],
    };

    const listaHorarios = horariosManuais[especialidade];
    if (!listaHorarios) {
      return res.status(400).json({
        error: `Especialidade '${especialidade}' nao suportada`,
      });
    }

    const slotsManuais = listaHorarios.map((horario) => {
      const [hora, minuto] = horario.split(":");
      return `${data}T${hora.padStart(2, "0")}:${minuto}:00.000Z`;
    });

    // Busca agendamentos específicos para esta data
    const startDate = new Date(`${data}T00:00:00.000Z`);
    const endDate = new Date(`${data}T23:59:59.999Z`);

    const agendamentos = await Agendamento.find({
      especialidade,
      status: { $ne: "reprovado" },
      dataHora: {
        $gte: startDate,
        $lte: endDate,
      },
    }).select("dataHora");

    const ocupados = agendamentos.map((ag) => ag.dataHora.toISOString());

    // Filtra apenas os slots que disponiveis
    const disponiveis = slotsManuais.filter((slot) => !ocupados.includes(slot));

    res.json(disponiveis);

    console.log("Data solicitada:", data);
    console.log("Start Date:", startDate.toISOString());
    console.log("End Date:", endDate.toISOString());
    console.log("Agendamentos encontrados:", agendamentos.length);
    console.log("Ocupados:", ocupados);
    console.log("Slots manuais:", slotsManuais);
    console.log("Disponíveis:", disponiveis);
  } catch (err) {
    console.error("Erro ao buscar horarios disponiveis:", err);
    res.status(500).json({ error: err.message });
  }
};
