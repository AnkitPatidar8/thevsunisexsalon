
import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import InstagramPost from "../models/InstagramPost.js";

const router = express.Router();


// ADD POST (Instagram URL se image extract)
router.post("/add-post", async (req, res) => {

  try {

    const { url } = req.body;

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = response.data;

    const $ = cheerio.load(html);

    const image = $('meta[property="og:image"]').attr("content");

    if (!image) {
      return res.status(400).json({ error: "Image not found" });
    }

    const newPost = new InstagramPost({
      url,
      image
    });

    await newPost.save();

    res.json({ success: true });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Instagram fetch failed"
    });

  }

});


// GET POSTS
router.get("/posts", async (req, res) => {

  const posts = await InstagramPost.find().sort({ _id: -1 });

  res.json(posts);

});


// DELETE POST
router.delete("/delete-post/:id", async (req, res) => {

  await InstagramPost.findByIdAndDelete(req.params.id);

  res.json({ success: true });

});

export default router;