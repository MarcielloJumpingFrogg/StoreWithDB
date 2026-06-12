import { prisma } from "../lib/prisma";

async function dropAll() {
  let result
  try {
    result = await prisma.$transaction([
      prisma.review.deleteMany(),
      prisma.store.deleteMany(),
    ]);
    console.log(result);
  } catch (e) {
    console.error(e)
  }
  finally {
    prisma.$disconnect()
  }
  return result
}


export { dropAll };

dropAll();
