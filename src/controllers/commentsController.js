import { ArticleModel } from "./models/article.model.js";
import { CommentModel } from "./models/comment.model.js";

export const createComment = async (req, res) => {
  const data = req.data;

  data.author = req.logeado._id;
  try {
    const comment = await CommentModel.create(data);

    return res.status(201).json({
      ok: true,
      message: "Comentario creado con exito",
      comment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getCommentsArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    const commentArt = await ArticleModel.findById(articleId)
      .populate("Comments")
      .populate("author");

    if (!commentArt) {
      return res.status(404).json({
        ok: false,
        message: "No hay ningun articulo",
      });
    }

    res.status(200).json({
      ok: true,
      message: "El artículo con sus comentarios y author son:",
      commentArt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getMyComments = async (req, res) => {
  try {
    const logueado = req.logeado;
    const mycomments = await CommentModel.find({ author: logueado._id });
    if (!mycomments) {
      return res.status(404).json({
        ok: false,
        message: "Mensajes no encontrados",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Los comentarios encontrados son:",
      mycomments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const data = req.data;

  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({
        ok: false,
        message: "Comentario no encontrado",
      });
    }

    res.status(201).json({
      ok: true,
      message: "Comentario actualizado",
      updatedComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await CommentModel.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({
        ok: false,
        message: "Comentario no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Comentario eliminado",
      deletedComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};