const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// POST /usuarios - Cadastrar novo usuário
router.post('/', async (req, res) => {
  try {
    // Extrair dados do corpo da requisição
    const { nome, email } = req.body;

    // Validação: verificar se nome e email foram enviados
    if (!nome || !email) {
      return res.status(400).json({ 
        erro: 'Nome e email são obrigatórios.' 
      });
    }

    // Validação: verificar se email é válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        erro: 'Email inválido.' 
      });
    }

    // Query SQL com placeholders ($1, $2) para evitar SQL Injection
    const queryText = `
      INSERT INTO usuarios (nome, email, ativo)
      VALUES ($1, $2, true)
      RETURNING *;
    `;
    
    const values = [nome, email];
    const resultado = await pool.query(queryText, values);

    // Retornar o usuário criado com status 201 (Created)
    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      usuario: resultado.rows[0]
    });

  } catch (error) {
    console.error('Erro ao inserir usuário:', error);

    // Tratar erro de email duplicado (Constraint UNIQUE)
    if (error.code === '23505') {
      return res.status(400).json({ 
        erro: 'Este email já está cadastrado.' 
      });
    }

    // Erro genérico
    return res.status(500).json({ 
      erro: 'Erro interno do servidor.' 
    });
  }
});

module.exports = router;