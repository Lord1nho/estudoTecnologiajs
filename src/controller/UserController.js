import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
    async CreateUser(req, res) {
        const { name, cpf } = req.body;

        const user = await prisma.user.findUnique({ where: { cpf } });

        if (user) {
            return res.json({ error: "cpf ja existe" })
        }
        await prisma.user.create({
            data: {
                name,
                cpf,
            },
        });
        return res.json(user)
    },
    async findAllUsers(req, res) {

        const users = await prisma.user.findMany()
        return res.json(users);
    }
}