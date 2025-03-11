import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // Para receber JSON no body

// 📌 Conectar ao MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL ✅");
  }
});

// 📌 Rota para listar todas as montagens
app.get("/montagens", (req, res) => {
  db.query("SELECT * FROM montagens", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

//ROTA PARA FILTRAR A MONTAGEM
app.get("/montagens/:bool/:value?", (req, res) => {
  const checked = req.params.bool;
  const value = req.params.value;
  if (checked == "true" && value == "concluido") {
    db.query("SELECT * FROM montagens WHERE concluido = 1", (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  } else if (checked == "true" && value == "pendente") {
    db.query("SELECT * FROM montagens WHERE concluido = 0", (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  } else if (checked == "true" && value == "todos") {
    db.query("SELECT * FROM montagens", (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  }
});

// 📌 Rota para criar uma montagem
app.post("/montagens", (req, res) => {
  const { nome, responsavel, concluido } = req.body;
  db.query(
    "INSERT INTO montagens (nome, responsavel, concluido) VALUES (?, ?, ?)",
    [nome, responsavel, concluido],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, nome, responsavel, concluido });
    }
  );
});

// 📌 Rota para atualizar uma montagem
app.put("/montagens/:id", (req, res) => {
  const { id } = req.params;
  const { nome, responsavel, concluido } = req.body;
  db.query(
    "UPDATE montagens SET nome=?, responsavel=?, concluido=? WHERE id=?",
    [nome, responsavel, concluido, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Atualizado com sucesso!" });
    }
  );
});

// 📌 Rota para excluir uma montagem
app.delete("/montagens/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM montagens WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Montagem excluída!" });
  });
});

// 📌 Iniciar o servidor
app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001 🚀");
});
