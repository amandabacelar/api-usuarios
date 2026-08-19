# API de Usuários

Bem-vindo! Esta é uma API REST para cadastrar e gerenciar usuários. Feita com Node.js, Express e PostgreSQL.

## Quick Start

1. Clone e instale:
```bash
git clone https://github.com/amandabacelar/api-usuarios.git
cd api-usuarios
npm install
```

2. Rode o PostgreSQL (Docker):
```bash
docker run --name postgres-local -e POSTGRES_PASSWORD=senha123 -p 5432:5432 -d postgres:15
docker exec -it postgres-local psql -U postgres -c "CREATE DATABASE usuarios_db;"
docker exec -it postgres-local psql -U postgres -d usuarios_db -c "CREATE TABLE usuarios (id SERIAL PRIMARY KEY, nome VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, ativo BOOLEAN DEFAULT true, criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
```

3. Inicie a API:
```bash
node src/index.js
```

Pronto! A API está rodando em `http://localhost:3000`

## Como usar

### Cadastrar um usuário

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome": "Amanda", "email": "amanda@email.com"}'
```

### Verificar status

```bash
curl http://localhost:3000/health
```

## Tecnologias

- Node.js
- Express
- PostgreSQL
- Docker

## Autor

Amanda Bacelar