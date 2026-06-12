import request from "supertest"
import { vi, expect, it, describe, beforeEach } from "vitest"

import { app } from "../app"

import { dropAll } from "../db/dropAll"
import { initialize } from "../db/initialize"
import { getAll } from "../db/getAll"

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

async function reset() {
  await dropAll()
  await initialize()
}

it("should work", async () => {
  await request(app).get('/').expect(200).expect("Content-Type", /html/)
})
  ;



describe("Testing DB", () => {
  it("Testing getAll", async () => {
    const { result } = await getAll()
    console.log("Result: ", store)
    expect(result).toMatchObject(store)
  })
  it("Throw error when server not found", async () => {
    vi.stubEnv("NODE_ENV", "test")
    vi.stubEnv("TEST_DATABASE_URL", '')
    vi.resetModules()
    await import('../db/getAll')


    const { result, error } = await getAll();
    expect(result).toBeUndefined()
    expect(error).toMatchObject({ code: 500 })
  })
})
