import { Router } from 'express';
import UserController from './controller/UserController';
import ItemController from './controller/ItemController';
import InventarioController from './controller/InventarioController';
import CarrinhoController from './controller/CarrinhoController';

const router = Router();

// Usuario
router.post("/usuario/criar", UserController.CreateUser);
router.get("/usuario/buscar", UserController.ReadUser);
router.get("/users", UserController.ReadAllUsers);

// Item
router.post("/item/criar", ItemController.CreateItem);
router.get("/item/buscar", ItemController.ReadItem);
router.get("/item/buscarTodos", ItemController.ReadAllItens);
router.delete("/item/deletarItem", ItemController.DeletarItem);
router.put("/item/modificarItem", ItemController.AtualizarItem);

// Inventario
router.post("/inventario/criar", InventarioController.CreateInventory);
router.get("/inventario/buscar", InventarioController.ReadInventory);
router.get("/inventario/buscarTodos", InventarioController.ReadAllInventories);
router.delete("/inventario/deletar", InventarioController.DeletarInventario);
router.put("/inventario/modificarItem", InventarioController.AtualizarInventario);

// Carrinho
router.post("/carrinho/criar", CarrinhoController.CreateCarrinho);
router.get("/carrinho/buscar", CarrinhoController.ReadCarrinho);
router.get("/carrinho/buscarTodos", CarrinhoController.ReadAllCarrinho);
router.delete("/carrinho/deletar", CarrinhoController.DeletarCarrinho);
router.put("/carrinho/modificar", CarrinhoController.AtualizarCarrinho);



export {router};
