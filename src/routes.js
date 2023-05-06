import { Router } from 'express';
import UserController from './controller/UserController';

const router = Router();

//router.post("/user", UserController.CreateUser);
router.get("/users", UserController.findAllUsers);



export { router } ;
