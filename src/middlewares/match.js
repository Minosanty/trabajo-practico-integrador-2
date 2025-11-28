import { matchedData } from "express-validator";

export const dataValida = async (req, res, next) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    // console.log(data);
    if (Object.keys(data).length === 0) {
      return res
        .status(404)
        .json({ Message: "Los datos tienen que ser correctos" });
    }
    req.data = data;
    next();
  } catch (error) {
    res.status(500).json({ Message: "Error interno en el servidor" });
  }
};
