const express = require("express");
const router = express.Router();
const {
  createPaciente,
  getPacientes,
} = require("../controllers/pacienteController");

router.post("/", createPaciente);
router.get("/", getPacientes);

module.exports = router;
