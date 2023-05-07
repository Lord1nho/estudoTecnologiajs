import { PrismaClient } from '@prisma/client';

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
}