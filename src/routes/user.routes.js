import express from "express";
import {
  deleteUserAdmin,
  getAllUser,
  getByIdUser,
  updateUser,
} from "../controllers/user.controllers.js";
import { aplicarValidaciones } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { adminMiddleware } from "../middlewares/admin.js";
import { dataValida } from "../middlewares/match.js";
import { OwnerOrAdminCommentMiddleware } from "../middlewares/owner.js";
import {
  idUserValidations,
  updateUserValidations,
} from "../middlewares/validations/user.validations.js";

export const routerUser = express.Router();
routerUser.get("/users", authMiddleware, adminMiddleware, getAllUser);
routerUser.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  idUserValidations,
  aplicarValidaciones,
  getByIdUser
);
routerUser.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  idUserValidations,
  updateUserValidations,
  aplicarValidaciones,
  dataValida,
  updateUser
);
routerUser.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  idUserValidations,
  aplicarValidaciones,
  deleteUserAdmin
);
