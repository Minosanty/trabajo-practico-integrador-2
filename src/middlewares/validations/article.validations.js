import { body, param } from "express-validator";
import { ArticleModel } from "./../models/article.model.js";

export const idArticleValidation = [
  param("id")
    .isMongoId()
    .withMessage("El id no es válido")
    .custom(async (id) => {
      const article = await ArticleModel.findById(id);
      if (!article) {
        throw new Error("El articulo no existe");
      }
      return true;
    }),
];

export const createArticleValidations = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser 'published' o 'archived'"),

  body("tags.*")
    .optional()
    .isMongoId()
    .withMessage("cada etiqueta debe ser un id valido"),
];
export const updateValidationArticle = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .optional()
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser 'published' o 'archived'"),

  body("author")
    .optional()
    .isMongoId()
    .withMessage("El autor debe ser un ID válido")
    .custom(async (author, { req }) => {
      if (
        author !== req.logeado._id.toString() ||
        req.logeado.role !== "admin"
      ) {
        throw new Error("No puedes realizar esta función");
      }
      return true;
    }),
  body("tags.*")
    .optional()
    .isMongoId()
    .withMessage("cada etiqueta debe ser un id valido"),
];
