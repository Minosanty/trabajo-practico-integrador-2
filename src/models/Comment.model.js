import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 500,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const CommentModel = model("Comment", CommentSchema);
