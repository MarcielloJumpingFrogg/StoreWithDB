import request from "supertest"
import { vi, expect, it, describe, beforeEach } from "vitest"
import { prisma, refreshPrisma } from "../lib/prisma"

import { app } from "../app"

import { dropAll } from "../db/dropAll"
import { initialize } from "../db/initialize"
import { getAll } from "../db/getAll"
import { afterEach } from "node:test"

const store = [
  {
    name: "Silent Pink Switch",
    price_cents: 10,
    producer: "generic",
    amount: 120,
    categories: ["silent", "generic", "MX cherry"],
  },
  {

    name: "Kahil clicky green switches",
    price_cents: 20,
    producer: "Kahil",
    categories: ["MX cherry", "clicky", "kahil", "premium"],
    amount: 80,
  },
]

const categories = [
  {
    categoryName: "silent"
  },
  {
    categoryName: "generic"
  },
  {
    categoryName: "MX cherry"
  },
  {
    categoryName: "clicky"
  },
  {
    categoryName: "kahil"
  },
  {
    categoryName: "premium"
  },
]

beforeEach(async () => {
  //Clear the Database
  // const { result, error } = await getAll()
  // console.log('here are the results: ', result.length, error)
  // if (result.length != 0 && error != undefined) {
  await dropAll()
  //initialize it
  //}
  await initialize()
})

afterEach(async () => {
  vi.unstubAllEnvs();
  refreshPrisma();
})


it("should work", async () => {
  await request(app).get('/').expect(200).expect("Content-Type", /html/)
});

describe("checking stub env", async () => {
  it("Should return NODE_ENV==test", () => {
    const env = process.env.NODE_ENV
    expect(env).toBe("test")
  })

  it("Should change after being assigned", () => {
    vi.stubEnv("NODE_ENV", "None")
    const env = process.env.NODE_ENV
    expect(env).toBe("None")
    vi.unstubAllEnvs();
  })


})


describe("Testing DB", () => {
  it("Testing getAll", async () => {
    const { result, error } = await getAll()
    console.log("Result: ", result)
    expect(error).toBeUndefined();
    expect(result).toMatchObject(store)
  })
  it("Throw error when server not found", async () => {
    vi.stubEnv("NODE_ENV", "other")
    vi.stubEnv("DATABASE_URL", '')
    refreshPrisma();


    const { result, error } = await getAll();
    expect(result).toEqual([])
    expect(error).toMatchObject({ code: 500 })
    vi.unstubAllEnvs()
    refreshPrisma()
  })

})
