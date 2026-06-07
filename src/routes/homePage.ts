import express from "express";
import ejs from "ejs";
import { getAll } from "../../db/getAll";
const homePage = express.Router();

homePage.get("/", (req, res) => {
  const articleList = getAll();
  console.log("art: ", articleList);
  res.render("homePage", {
    title: "HomePage",
    articleList: articleList,
  });
});

export { homePage };
