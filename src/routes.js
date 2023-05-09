import { Router } from 'express';
import UserController from './controller/UserController';
import ItemController from './controller/ItemController';

const router = Router();

router.post("/usuario/criar", UserController.CreateUser);
router.get("/usuario/buscar", UserController.ReadUser);
router.get("/users", UserController.ReadAllUsers);

router.post("/item/criar", ItemController.CreateItem);
router.get("/item/buscar", ItemController.ReadItem);
router.get("/item/buscarTodos", ItemController.ReadAllItens);
router.delete("/item/deletarItem", ItemController.DeletarItem);
router.put("/item/modificarItem", ItemController.AtualizarItem);

export { router };
