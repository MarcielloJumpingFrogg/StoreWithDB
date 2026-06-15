import express from "express";

const newRoute = express.Router();

newRoute.get("/", (req, res) => {
  res.status(200).render("newItemForm", { title: "NewItemForm" })
})


export { newRoute }
