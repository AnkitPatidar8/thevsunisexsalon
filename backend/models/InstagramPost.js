import mongoose from "mongoose";

const instagramSchema = new mongoose.Schema({
  url: String,
  image: String
});

export default mongoose.model("InstagramPost", instagramSchema);