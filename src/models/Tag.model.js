import { Schema, model } from "mongoose";
import { ArticleModel } from "article.model.js";

export const TagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 30,
    },
    description: {
      type: String,
      maxLength: 200,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//Esto hacemos para buscar la etiqueta que está a punto de ser eliminada y antes sacarla del articulo.
//Artículos que tengan esa etiqueta e investigación del $pull que me elimina del array.
TagSchema.pre("findOneAndDelete", async function (next) {
  const tag = await this.model.findOne(this.getFilter());

  if (tag) {
    await ArticleModel.updateMany(
      { tags: tag._id },
      { $pull: { tags: tag._id } }
    );
  }

  next();
});

//populates inversos
TagSchema.virtual("Articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "tags",
  justOne: false,
});

TagSchema.set("toObject", { virtuals: true });
TagSchema.set("toJSON", { virtuals: true });

export const TagModel = model("Tag", TagSchema);
