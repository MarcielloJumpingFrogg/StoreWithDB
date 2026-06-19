import { prisma } from "../lib/prisma";

//async function dropAll() {
//  let result
//  try {
//    result = await prisma.$transaction([
//      prisma.review.deleteMany(),
//      prisma.store.deleteMany(),
//      prisma.categories.deleteMany(),
//    ]);
//    console.log(result);
//  } catch (e) {
//    console.error(e)
//  }
//  finally {
//    prisma.$disconnect()
//  }
//  return result
//}

async function dropAll() {
  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Review" RESTART IDENTITY CASCADE`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Store" RESTART IDENTITY CASCADE`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Categories" RESTART IDENTITY CASCADE`);
  } catch (e) {
    console.error(e)
  }
  finally {
    prisma.$disconnect()
  }
}

export { dropAll };

dropAll();
