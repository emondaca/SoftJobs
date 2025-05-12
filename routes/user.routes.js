import { Router } from "express";

import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { reportarConsulta } from "../middlewares/reports.middleware.js"

const router = Router();

//POST /usuarios
router.post("/usuarios", reportarConsulta, userController.register);

router.post("/login", reportarConsulta, userController.login);

router.get("/usuarios", reportarConsulta, authMiddleware, userController.traerUsuario);

export default router;
