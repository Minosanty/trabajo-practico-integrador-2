import { UserModel } from "./models/user.model.js";

export const getAllUser = async (_req, res) => {
  try {
    const users = await UserModel.find();

    if (!users) {
      res.status(404).json({ ok: false, message: "Usuarios no encontrados" });
    }

    res.status(200).json({
      ok: true,
      message: "Usuarios encontrados exitosamente",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getByIdUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id)
      .populate("Articles")
      .populate("Comments");

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.data;
  console.log(data);
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        ok: false,
        message: "No se encontro el usuario",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Usuario actualizado correctamente",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteUserAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    res.status(200).json({
      ok: true,
      message: "Usuario eliminado completamente con exito",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
