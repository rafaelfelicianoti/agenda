const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/agenda")
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch((err) => console.log("Erro ao conectar:", err));

// Rotas
const pacienteRoutes = require("./routes/pacienteRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");

app.use("/api/pacientes", pacienteRoutes);
app.use("/api/agendamentos", agendamentoRoutes);

//teste api
app.get("/", (req, res) => {
  res.send("API Funcionando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
