import express from "express";
import { body, validationResult } from "express-validator"
import { userCreatePost } from "../controllers/newItem";

const newRoute = express.Router();

newRoute.get("/", (req, res) => {
  res.status(200).render("newItemForm", { title: "NewItemForm" })
});


const verified = [
  body("name").optional({ values: "falsy" })
]

newRoute.post("/", userCreatePost)

export { newRoute }
