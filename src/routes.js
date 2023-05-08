import { Router } from 'express';
import UserController from './controller/UserController';

const router = Router();

router.post("/usuario/criar", UserController.CreateUser);
router.get("/usuario/buscar", UserController.ReadUser);
router.get("/users", UserController.ReadAllUsers);


export { router };
