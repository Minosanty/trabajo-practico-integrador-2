import { matchedData } from "express-validator";
import { ArticleModel } from "./models/article.model.js";

export const articleCreate = async (req, res) => {
  const data = matchedData(req, { locations: ["body"] });

  data.author = req.logeado._id;

  console.log(data);

  try {
    const article = await ArticleModel.create(data);

    return res.status(201).json({
      ok: true,
      message: "Artículo creado exitosamente",
      data: article,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getAllArticles = async (_req, res) => {
  try {
    const articles = await ArticleModel.find()
      .populate("author")
      .populate("tags");
    if (!articles) {
      return res.status(404).json({
        ok: false,
        message: "No se encontro ningun articulo",
      });
    }
    res.status(200).json({
      ok: true,
      message: "Articulos encontrados",
      articles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getByIdArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findById(id)
      .populate("author")
      .populate("tags");
    if (!article) {
      return res.status(404).json({
        ok: false,
        message: "No se encontro el artículo",
      });
    }
    res.status(200).json({
      ok: true,
      message: "Articulo encontrado",
      article,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getMyArticles = async (req, res) => {
  try {
    const logueado = req.logeado;

    const myArticles = await ArticleModel.find({ author: logueado._id });
    if (!myArticles) {
      return res.status(404).json({
        ok: false,
        message: "No posees artículos",
      });
    }
    return res.status(200).json({
      ok: true,
      message: "Tus articulos",
      articles: myArticles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateMyArticle = async (req, res) => {
  const { id } = req.params;
  const data = matchedData(req, { locations: ["body"] });

  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({
        ok: false,
        message: "Artículo no encontrado",
      });
    }
    res.status(201).json({
      ok: true,
      message: "Articulo actualizado correctamente",
      updatedArticle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArticle = await ArticleModel.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({
        ok: false,
        message: "Artículo no encontrado",
      });
    }
    return res.status(200).json({
      ok: true,
      message: "Articulo eliminado exitosamente",
      deletedArticle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
