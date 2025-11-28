import { matchedData } from "express-validator";
import { UserModel } from "./models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"], nested: true });
    const hashedPassword = await hashPassword(data.password);

    console.log(data);

    const user = await UserModel.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      profile: {
        first_name: data.profile.first_name,
        last_name: data.profile.last_name,
        biography: data?.profile?.biography || "",
        avatarUrl: data?.profile?.avatarUrl || "",
        birthDate: data?.profile?.birthDate || Date.now(),
      },
    });
    return res
      .status(201)
      .json({ ok: true, message: "Usuario registrado exitosamente", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error al registrar usuario", error });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({
      username,
    });
    if (!user) {
      return res
        .status(401)
        .json({ ok: false, message: "Credenciales invalidas" });
    }
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ ok: false, message: "Credenciales inválidas" });
    }
    const token = generateToken({
      _id: user._id,
      name: user.profile.first_name,
      lastname: user.profile.last_name,
      role: user.role,
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hora
    });
    return res.status(200).json({ ok: true, message: "Login exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ ok: true, message: "Logout exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};

export const getProfileAuth = async (req, res) => {
  try {
    const logueado = req.logeado;
    // req.user._id viene del token JWT decodificado en el middleware
    const user = await UserModel.findById(logueado._id).select(
      "profile username _id"
    );

    if (!user) {
      return res
        .status(404)
        .json({ ok: false, message: "Usuario no encontrado" });
    }

    res.status(200).json({
      ok: true,
      message: "Perfil encontrado",
      data: user.profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateAuthProfile = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"], nested: true });
    //No sirve porque ya agregue mi match
    const logueado = req.logeado;

    const updatedProfile = await UserModel.findByIdAndUpdate(
      logueado._id,
      { $set: data },
      { new: true }
    );

    if (updatedProfile) {
      return res.status(200).json({
        ok: true,
        message: "Perfil actualizado",
        profile: updatedProfile,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
