import express from "express";

import { homePage } from "../routes/homePage";
import { getAll } from "../../db/getAll";

export default function (app: any) {
  app.use(
    "/",
    async (req, res, next) => {
      let result: Array<object> = await getAll();
      req.articleList = result;
      next();
    },
    homePage,
  );
}
