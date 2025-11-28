import { Schema, model } from "mongoose";
import { CommentModel } from "comment.model.js";

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 3,
      maxLength: 300,
    },
    content: {
      type: String,
      minLength: 50,
    },
    excerpt: {
      type: String,
      maxLength: 500,
    },
    status: {
      type: String,
      enum: ["published", "archived"],
      default: "published",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
//Eliminación en cascada
ArticleSchema.pre("findByIdAndDelete", async function (next) {
  const article = await this.model.findOne(this.getFilter());

  if (article) {
    await CommentModel.deleteMany({ article: article._id });
  }

  next();
});

//Populates inversos.
ArticleSchema.virtual("Comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "article",
  justOne: false,
});

ArticleSchema.set("toJSON", { virtuals: true });
export const ArticleModel = model("Article", ArticleSchema);
