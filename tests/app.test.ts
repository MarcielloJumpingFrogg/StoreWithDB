import request from "supertest"
import { vi, expect, it, describe, beforeEach } from "vitest"
import { prisma, refreshPrisma } from "../lib/prisma"

import { app } from "../app"

import { dropAll } from "../db/dropAll"
import { initialize } from "../db/initialize"
import { getAll, getEnvVariables } from "../db/getAll"

const store = [
  {
    name: "Silent Pink Switch",
    price_cents: 10,
    producer: "generic",
    amount: 120,
    categories: ["silent", "generic", "rx cherry"],
  },
  {

    name: "Kahil clicky green switches",
    price_cents: 20,
    producer: "Kahil",
    categories: ["clicky", "kahil", "premium", "rx cherry"],
    amount: 80,
  },
]

//beforeEach(async () => {
//  //Clear the Database
//  await dropAll()
//  //initialize it 
//  await initialize()
//
//  return async () => {
//    //vi.unstubAllEnvs();
//  }
//
//})

//async function reset() {
//  await dropAll()
//  await initialize()
//}

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
  })
})
