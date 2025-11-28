export const adminMiddleware = async (req, res, next) => {
  try {
    if (req.logeado.role !== "admin") {
      return res
        .status(403)
        .json({ ok: false, Message: "Solo un admin puede hacer esta acción" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};
