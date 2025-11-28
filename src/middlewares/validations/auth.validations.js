import { body } from "express-validator";
import { UserModel } from "./../models/user.model.js";

export const createUserValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El campo de username no puede estar vacío")
    .isLength({ min: 3, max: 20 })
    .custom(async (username, { req }) => {
      try {
        const usernameUnico = await UserModel.findOne({
          username: req.body.username,
        });
        if (usernameUnico) {
          return Promise.reject("El username ya existe");
        }
      } catch (error) {
        console.error("Error interno", error);
        return Promise.reject("Error al verificar el username");
      }
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El campo de email no debe estar vacío")
    .isEmail()
    .withMessage("El email debe estar en formato de email")
    .isLength({ max: 100 })
    .withMessage("El email debe tener al un maximos de 100 caracteres ")
    .custom(async (email, { req }) => {
      try {
        const emailUnico = await UserModel.findOne({
          email: req.body.email,
        });
        if (emailUnico) {
          return Promise.reject("El email ya existe");
        }
      } catch (error) {
        console.error("Error interno", error);
        return Promise.reject("Error al verificar el email");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("El campo de password no puede estar vacío")
    .isLength({ min: 8, max: 255 })
    .withMessage("La contraseña debe tener al menos 8 caracteres y maximo 255")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una letra mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe tener al menos una letra minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe tener al menos un número"),
  body("role")
    .optional()
    .trim()
    .isIn(["user", "admin"])
    .withMessage("El role debe ser 'user' o 'admin'"),
  body("profile.first_name")
    .trim()
    .notEmpty()
    .withMessage("El campo de first_name no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "El campo first_name no puede tener menos de 2 caracteres ni más de 50"
    )
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("En el campo de first_name solo pueden ir letras"), //Función buscada en documentación, fijarse por las dudas la especificación de idioma.

  body("profile.last_name")
    .trim()
    .notEmpty()
    .withMessage("El campo de last_name no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "El campo last_name no puede tener menos de 2 caracteres ni más de 50"
    )
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("En el campo de last_name solo pueden ir letras"),

  body("profile.biography")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("La biography no puede superar los 500 caracteres."),

  body("profile.avatar_url")
    .optional()
    .isURL()
    .withMessage("El avatar debe ser un URL valido"),

  body("profile.birthDate")
    .optional()
    .isDate()
    .withMessage("El formato del cumpleaños debe ser en 'fecha'"),
];

export const soloProfileValidation = [
  body("profile.first_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo de first_name no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "El campo first_name no puede tener menos de 2 caracteres ni más de 50"
    )
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("En el campo de first_name solo pueden ir letras"), //Función buscada en documentación, fijarse por las dudas la especificación de idioma.

  body("profile.last_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo de last_name no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "El campo last_name no puede tener menos de 2 caracteres ni más de 50"
    )
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("En el campo de last_name solo pueden ir letras"),

  body("profile.biography")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("La biography no puede superar los 500 caracteres."),

  body("profile.avatar_url")
    .optional()
    .isURL()
    .withMessage("El avatar debe ser un URL valido"),

  body("profile.birthDate")
    .optional()
    .isDate()
    .withMessage("El formato del cumpleaños debe ser en 'fecha'"),
];
