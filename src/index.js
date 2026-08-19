const express = require('express');
require('dotenv').config();
const pool = require('./config/database');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(express.json());

// Importar rotas
const usuariosRoutes = require('./routes/usuarios');

// Usar as rotas
app.use('/usuarios', usuariosRoutes);

// Rota de teste
app.get('/health', (req, res) => {
  res.json({ status: 'OK', mensagem: 'API está rodando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});