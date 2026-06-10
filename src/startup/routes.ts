import express from "express";
import {prisma} from "../../lib/prisma"

import { homePage } from "../routes/homePage";
import { getAll } from "../../db/getAll";

export default async function (app: any) {
  app.use(
    "/",
    async (req, res, next) => {
      //let result: Array<object> = await getAll();
      req.articleList = await getAll()
      prisma.$disconnect();
      console.log("worked")
        next();

    },
    homePage,
  );
}
