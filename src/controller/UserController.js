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
