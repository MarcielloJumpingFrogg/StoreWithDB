import { prisma } from "../lib/prisma";
import type { itemInStore } from "../custom";


async function getAll() {
  const result: Array<itemInStore> = [];
  let error: boolean = false
  try {
    const res = await prisma.store.findMany();
    res.forEach(element => {
      result.push(element)
    });
  } catch {
    error = true;
  }
  finally {
    prisma.$disconnect();
  }
  if (error) {
    return error
  }
  else {
    return result;

  }
}

export { getAll };

getAll();
