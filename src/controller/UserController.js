import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  // Criar usuario
  async CreateUser(req, res) {
    try {
      const { login, primeiro_nome, sobrenome, email, senha, data_nascimento, telefone} = req.body;

      let usuario = await prisma.usuario.findUnique({ where: { login } });

      if (usuario) {
        return res.json({ erro: "login ja cadastrado" })
      }


      usuario = await prisma.usuario.create({
        data: {
          login,
          primeiro_nome,
          sobrenome,
          email,
          senha,
          data_nascimento,
          telefone,
        }
      })

      return res.json(usuario);

    } catch (error) {
      return res.json({ error });
    }
  },


  // Listar usuario especifico
  async ReadUser(req,res){
    try {
      const {login} = req.body;
      let usuario = await prisma.usuario;findUnique({where: {login}});

      if (usuario) {
        return res.json(usuario);
      }

      return res.json({erro: "Usuario nao encontrado"});

    } catch (error) {
      return res.json({error});
    }
  },


  // Listar todos os usuarios  
  async ReadAllUsers(req, res) {
    try {
      const users = await prisma.usuario.findMany();
      return res.json(users);

    } catch (error) {
      return res.json({error});
    }
  },


}

/*

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
*/