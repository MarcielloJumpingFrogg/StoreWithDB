import { prisma } from "../lib/prisma"

async function getByFilter(label: string, expected: string | number, sign: string | void) {
  let result
  let error
  try {

    if (typeof expected === 'string') {
      result = await prisma.store.findMany({
        where: {
          [label]: expected
        }
      })
    }
    else {
      if (sign) {
        result = await prisma.store.findMany({
          where: {
            [label]: {
              [sign]: expected
            }
          }
        })
      }
      else {
        console.error("❌️: Expected sign")
        throw new Error
      }
    }
    console.log(result)
  } catch (e) {
    error = "No result found"
    console.log("❌️: No result found with the given Data")
  }
  prisma.$disconnect()
  return { result, error }
}

export { getByFilter }

getByFilter("amount", 120, 'lt')
