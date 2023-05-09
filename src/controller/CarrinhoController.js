import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    // Criar carrinho
    async CreateCarrinho(req, res) {
      try {
        const {id_item, qtd_itens, valor, login, status} = req.body;
  
  
        let carrinho = await prisma.carrinho.create({
          data: {
            id_item,
            qtd_itens,
            valor,
            login,
            status,
          }
        })
  
        return res.json(carrinho);
  
      } catch (error) {
        return res.json({ error });
      }
    },
  
  
    // Listar carrinho especifico
    async ReadCarrinho(req,res){
      try {
        const {id_carrinho} = req.body;
        let carrinho = await prisma.carrinho.findUnique({where: {id_carrinho}});
  
        if (carrinho) {
          return res.json(carrinho);
        }
  
        return res.json({erro: "carrinho nao encontrado"});
  
      } catch (error) {
        return res.json({error});
      }
    },
  
  
    // Listar todos os carrinhos  
    async ReadAllCarrinho(req, res) {
      try {
        const carrinhos = await prisma.carrinho.findMany();
        return res.json(carrinhos);
  
      } catch (error) {
        return res.json({error});
      }
    },


    // Deletar carrinho
    async DeletarCarrinho(req,res) {
        try {
            const {id_carrinho} = req.body;
            const carrinho = await prisma.carrinho.findUnique({where: {id_carrinho}});

            if (!carrinho) {
                return res.json({erro: "carrinho nao encontrado"});
            }

            await prisma.carrinho.delete({where: {id_carrinho}});
            return res.json({sucesso: "carrinho deletado"});  

        } catch (error) {
            return res.json({error});
        }

    },


    // Atualizar carrinho
    async AtualizarCarrinho(req,res) {
        try {
            const {id_carrinho, id_item, qtd_itens, valor, login, status} = req.body;
            
            let carrinho = await prisma.carrinho.findUnique({where: {id_carrinho}});

            if (!carrinho) {
                return res.json({erro: "carrinho nao encontrado"});
            }

            carrinho = await prisma.carrinho.update({
                where: {id_carrinho},
                data: {id_item, qtd_itens, login, status, valor}
            });

            return res.json(carrinho);


            // Método que ao modificar status carrinho p/ "finalizado", alterar status no inventário para "ativo"
/*
            const result = await prisma.carrinho.findMany({
                join: {
                  inventario: {
                    select: {
                      id_inventario: true
                    },
                    where: {
                      id_carrinho: id_carrinho
                    },
                  },
                },
                select: {
                },
              });


            if (carrinho.status == "finalizado") {
                await prisma.inventario.update({
                    where: {result},
                    data: {status: "ativo"}
                });
            }
*/

        } catch (error) {
            return res.json({error});
        }
    },

}