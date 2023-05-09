import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    // Criar inventário
    async CreateInventory(req, res) {
      try {
        const {id_item, id_carrinho, login, status} = req.body;
  
  
        let inventario = await prisma.inventario.create({
          data: {
            id_item,
            id_carrinho,
            login,
            status,
          }
        })
  
        return res.json(inventario);
  
      } catch (error) {
        return res.json({ error });
      }
    },
  
  
    // Listar inventario
    async ReadInventory(req,res){
      try {
        const {id_inventario} = req.body;
        let inventario = await prisma.inventario.findUnique({where: {id_inventario}});
  
        if (inventario) {
          return res.json(inventario);
        }
  
        return res.json({erro: "Inventario inexistente"});
  
      } catch (error) {
        return res.json({error});
      }
    },
  
  
    // Listar todos os inventarios  
    async ReadAllInventories(req, res) {
      try {
        const inventories = await prisma.inventario.findMany();
        return res.json(inventories);
  
      } catch (error) {
        return res.json({error});
      }
    },


    // Deletar Inventario
    async DeletarInventario(req,res) {
        try {
            const {id_inventario} = req.body;
            const inventario = await prisma.inventario.findUnique({where: {id_inventario}});

            if (!inventario) {
                return res.json({erro: "Inventario nao encontrado"});
            }

            await prisma.inventario.delete({where: {id_inventario}});
            return res.json({sucesso: "Inventario deletado"});
            
        } catch (error) {
            return res.json({error});
        }

    },


    // Atualizar Inventario
    async AtualizarInventario(req,res) {
        try {
            const {id_inventario, id_item, status} = req.body;
            
            let inventario = await prisma.inventario.findUnique({where: {id_inventario}});

            if (!inventario) {
                return res.json({erro: "Inventario nao encontrado"});
            }

            inventario = await prisma.inventario.update({
                where: {id_inventario},
                data: {status}
            });
            return res.json(inventario);

        } catch (error) {
            return res.json({error});
        }
    },

}