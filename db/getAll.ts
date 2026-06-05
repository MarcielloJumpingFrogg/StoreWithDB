import { prisma } from "../lib/prisma";

async function main() {
  const result = await prisma.store.findMany();
  console.log(result);
  return result;
}

async function getAll() {
  const res = main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  return res;
}

export { getAll };

getAll();
