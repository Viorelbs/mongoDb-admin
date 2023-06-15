import { Schema, model, models } from "mongoose";

const MediaSchema = new Schema({
  title: { type: String, required: true },
  //   url: { type: String, required: true },
});

export const Media = models.Media || model("Media", MediaSchema);
