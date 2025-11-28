import express from "express";
import {
  getProfileAuth,
  login,
  logout,
  register,
  updateAuthProfile,
} from "../controllers/auth.controllers.js";
import { aplicarValidaciones } from "../middlewares/validator.js";
import { dataValida } from "../middlewares/match.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createUserValidation,
  soloProfileValidation,
} from "../middlewares/validations/auth.validations.js";

export const routerAuth = express.Router();
routerAuth.post(
  "/auth/register",
  createUserValidation,
  aplicarValidaciones,
  dataValida,
  register
);
routerAuth.post("/auth/login", login);
routerAuth.post("/auth/logout", authMiddleware, logout);
routerAuth.get("/auth/profile", authMiddleware, getProfileAuth);
routerAuth.put(
  "/auth/profile",
  authMiddleware,
  soloProfileValidation,
  aplicarValidaciones,
  dataValida,
  updateAuthProfile
);
