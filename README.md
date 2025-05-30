# 🩺 Sistema de Agendamentos - React + Node.js + MongoDB

Este é um sistema completo para agendamento de consultas, composto por um **frontend em React** e um **backend em Node.js com Express e MongoDB**.

---

## 🚀 Funcionalidades

### ✅ Backend (API)

- 📅 Criar e listar horários disponíveis
- 🗓️ Criar agendamentos de consultas
- 🔍 Listar agendamentos por paciente
- 📋 Listar todos os agendamentos (admin)
- ✅ Aprovar ou reprovar agendamentos (admin)
- ❌ Impede agendamentos duplicados no mesmo horário
- ❌ Impede agendamento que não seja em data futura
- 🔐 Login com nome admin para visualizar, aprovar ou reprovar agendamentos dos pacientes

---

## 📁 Estrutura do Projeto

```
├── backend/ # API RESTful (Node.js + Express + Mongoose)
└── frontend/ # Interface do usuário (React + Axios)
```

---

## 🧰 Tecnologias Utilizadas

### 🖥️ Frontend

- React 19
- React Router DOM
- Axios
- React Scripts
- Testing Library

### 🌐 Backend

- Node.js
- Express 5
- Mongoose (MongoDB)
- Dotenv
- CORS
- Nodemon

---

## 📁 Estrutura do Projeto

```
├── backend/ # API em Node.js + Express + MongoDB
└── frontend/ # Aplicação React
```

---

### 🧾 Modelos no Mongoose

- **Paciente**: nome, telefone
- **Agendamento**: paciente, especialidade, data/hora, status (`pendente`, `aprovado`, `reprovado`)

---

## 🧰 Tecnologias

### 🖥️ Frontend

- React 19
- React Router DOM
- Axios
- React Scripts
- Testing Library

### 🌐 Backend

- Node.js
- Express 5
- Mongoose
- Dotenv
- CORS
- Nodemon

---

## ✅ Requisitos

- Node.js 16+ instalado
- MongoDB local ou em nuvem (ex: MongoDB Atlas)
- npm

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/rafaelfelicianoti/agenda.git
cd agenda
```

### 2. Rodando o backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` com o seguinte conteúdo:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/seubanco
```

```bash
npm run dev
```

### 3. Rodando o frontend

Abra outro terminal:

```bash
cd frontend
npm install
```

Crie um arquivo `.env` com o seguinte conteúdo:

```
REACT_APP_API_URL=http://localhost:5000
```

Inicie o frontend:

```bash
npm start
```

Se ocorrer erro devido criptografia/openssl:

```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
```

A aplicação será aberta automaticamente em: http://localhost:3000
