import { prisma } from "../../lib/prisma"
import { getAll } from "../../db/getAll";
import express from "express";
const homePage = express.Router();

homePage.get("/", async (req, res) => {
  const { result, error } = await getAll();
  if (error) {
    throw new Error(error)
  }
  prisma.$disconnect();

  res.status(200).render("homePage", {
    title: "HomePage",
    articleList: result
  });
});

export { homePage };
