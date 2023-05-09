import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    // Criar item
    async CreateItem(req, res) {
      try {
        const { nome, valor, id_jogador} = req.body;
  
  
        let item = await prisma.item.create({
          data: {
            nome,
            valor,
            id_jogador,
          }
        })
  
        return res.json(item);
  
      } catch (error) {
        return res.json({ error });
      }
    },
  
  
    // Listar item especifico
    async ReadItem(req,res){
      try {
        const {id_item} = req.body;
        let item = await prisma.item.findUnique({where: {id_item}});
  
        if (item) {
          return res.json(item);
        }
  
        return res.json({erro: "Item nao encontrado"});
  
      } catch (error) {
        return res.json({error});
      }
    },
  
  
    // Listar todos os itens  
    async ReadAllItens(req, res) {
      try {
        const itens = await prisma.item.findMany();
        return res.json(itens);
  
      } catch (error) {
        return res.json({error});
      }
    },


    // Deletar Item
    async DeletarItem(req,res) {
        try {
            const {id_item} = req.body;
            const item = await prisma.item.findUnique({where: {id_item}});

            if (!item) {
                return res.json({erro: "Item nao encontrado"});
            }

            await prisma.item.delete({where: {id_item}});
            return res.json({sucesso: "Item deletado"});
        
            

        } catch (error) {
            return res.json({error});
        }

    },


    // Atualizar Item
    async AtualizarItem(req,res) {
        try {
            const {id_item, nome, valor} = req.body;
            
            let item = await prisma.item.findUnique({where: {id_item}});

            if (!item) {
                return res.json({erro: "Item nao encontrado"});
            }

            item = await prisma.item.update({
                where: {id_item},
                data: {nome, valor}
            });
            return res.json(item);

        } catch (error) {
            return res.json({error});
        }
    },

}