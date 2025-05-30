const express = require("express");
const router = express.Router();

const {
  createAgendamento,
  getAgendamentos,
  atualizarStatusAgendamento,
  getHorariosDisponiveis,
} = require("../controllers/agendamentoController");

// cria agendamento
router.post("/", createAgendamento);

// lista agendamentos
router.get("/", getAgendamentos);

// aprovar/reprovar
router.patch("/:agendamentoId", atualizarStatusAgendamento);

// horarios disponiveis
router.get("/horarios-disponiveis", getHorariosDisponiveis);

module.exports = router;
