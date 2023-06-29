import { Schema, model, models } from "mongoose";

const FolderSchema = new Schema({
  title: { type: String, required: true },
});

export const Folders = models.Folders || model("Folders", FolderSchema);
