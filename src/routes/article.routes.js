import express from "express";
import {
  articleCreate,
  deleteArticle,
  getAllArticles,
  getByIdArticle,
  getMyArticles,
  updateMyArticle,
} from "../controllers/article.controllers.js";
import { aplicarValidaciones } from "../middlewares/validator.js";
import { dataValida } from "../middlewares/match.js";
import { authMiddleware } from "../middlewares/auth.js";
import { adminMiddleware } from "../middlewares/admin.js";
import {
  ownerOrAdminArticleMiddleware,
  OwnerOrAdminCommentMiddleware,
} from "../middlewares/owner.js";
import {
  createArticleValidations,
  idArticleValidation,
  updateValidationArticle,
} from "../middlewares/validations/article.validations.js";

export const routerArticle = express.Router();
routerArticle.post(
  "/articles",
  authMiddleware,
  createArticleValidations,
  aplicarValidaciones,
  dataValida,
  articleCreate
);
routerArticle.get("/articles/my", authMiddleware, getMyArticles);
routerArticle.get("/articles", authMiddleware, getAllArticles);
routerArticle.get(
  "/articles/:id",
  authMiddleware,
  idArticleValidation,
  aplicarValidaciones,
  getByIdArticle
);
routerArticle.put(
  "/articles/:id",
  authMiddleware,
  ownerOrAdminArticleMiddleware,
  idArticleValidation,
  updateValidationArticle,
  aplicarValidaciones,
  dataValida,
  updateMyArticle
);
routerArticle.delete(
  "/articles/:id",
  authMiddleware,
  ownerOrAdminArticleMiddleware,
  idArticleValidation,
  aplicarValidaciones,
  deleteArticle
);
