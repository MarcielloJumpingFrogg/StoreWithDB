import { prisma } from "../lib/prisma";
import type { itemInStore } from "../custom";
import { fileURLToPath } from "url";

let __main__ = false

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  __main__ = true
  getAll();
}

function getEnvVariables() {
  const DATABASE_URL = process.env.DATABASE_URL
  console.log("DATABASE_URL", DATABASE_URL)

}


async function getAll() {
  const result: Array<itemInStore> = [];
  let error

  try {
    const res = await prisma.store.findMany();
    res.forEach(element => {
      result.push(element)
    });
  } catch (e) {
    error = {
      code: 500,
      message: "Internal server error"
    };
  }

  prisma.$disconnect();
  if (__main__) {
    console.log(result)
  }
  return { result, error }
}

export { getAll, getEnvVariables };

