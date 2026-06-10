import express from "express";
import ejs from "ejs";
const homePage = express.Router();

homePage.get("/", async (req, res) => {
  res.render("homePage", {
    title: "HomePage",
    articleList: req.articleList,
  });
});

export { homePage };
