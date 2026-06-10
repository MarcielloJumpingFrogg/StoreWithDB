import supertest from "supertest"
import express from "express"

import { app } from "../app"

test("should work", () => {
  supertest(app).get('/').expect("Content-type", "/html/")

})

