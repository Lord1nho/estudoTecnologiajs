/**import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
    
    async CreateUser(req, res) {
        const { login, 
            primeiro_nome,
             sobrenome, 
             email, 
             senha, 
             data_nascimento,
            telefone } = req.body;

      
        await prisma.usuario.create({
            data: {
                login, 
                primeiro_nome,
                sobrenome, 
                email, 
                senha, 
                data_nascimento,
                telefone
            },
        });
        return res.json(usuario)
    },

    async findAllUsers(req, res) {

        const users = await prisma.usuario.findMany()
        return res.json(users);
    }
}**/
const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

// Listar todos os usuários
app.get('/usuarios', async (req, res) => {
  const usuarios = await prisma.usuario.findMany()
  res.json(usuarios)
})

// Criar um novo usuário
app.post('/usuarios', async (req, res) => {
  const usuario = await prisma.usuario.create({
    data: {
      login: req.body.login,
      primeiro_nome: req.body.primeiro_nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: req.body.senha,
      data_nascimento: new Date(req.body.data_nascimento),
      telefone: { set: req.body.telefone },
    },
    include: {
      carteira: true,
    },
  })
  res.json(usuario)
})

// Atualizar um usuário existente
app.put('/usuarios/:login', async (req, res) => {
  const usuario = await prisma.usuario.update({
    where: {
      login: req.params.login,
    },
    data: {
      primeiro_nome: req.body.primeiro_nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: req.body.senha,
      data_nascimento: new Date(req.body.data_nascimento),
      telefone: { set: req.body.telefone },
    },
  })
  res.json(usuario)
})

// Excluir um usuário existente
app.delete('/usuarios/:login', async (req, res) => {
  const usuario = await prisma.usuario.delete({
    where: {
      login: req.params.login,
    },
  })
  res.json(usuario)
})

app.listen(3000, () =>
  console.log(`Servidor rodando em http://localhost:3000`)
)