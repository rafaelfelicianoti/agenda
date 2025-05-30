const Paciente = require("../models/Paciente");

exports.getPacientes = async (req, res) => {
  try {
    const { nome } = req.query;
    const pacientes = await Paciente.find(nome ? { nome } : {});
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPaciente = async (req, res) => {
  try {
    if (!req.body.nome || !req.body.telefone) {
      return res.status(400).json({ error: "Nome e telefone obrigatorios" });
    }

    const paciente = await Paciente.create(req.body);
    res.status(201).json(paciente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
