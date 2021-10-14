import { Router } from "express";
import userControler from "./controller/user.controler";
import { isCreatedUser } from "./middleware/isCreatedUser";
import { validResult } from "./middleware/validation";
import { validRegisterChema } from "./middleware/validation/validRegistration";

const router = Router();

router.post('/register', validRegisterChema,  validResult, isCreatedUser,  userControler.register);

router.post('/login', userControler.login);

export default router;