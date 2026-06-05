import { prisma } from "../lib/prisma";

async function main() {
  const result = await prisma.$transaction([
    prisma.review.deleteMany(),
    prisma.store.deleteMany(),
  ]);
  console.log(result);
}

async function dropAll() {
  main()
    .then(async () => {
      prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      prisma.$disconnect();
    });
}

export { dropAll };

dropAll();
