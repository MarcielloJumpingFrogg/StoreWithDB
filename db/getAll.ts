import { prisma } from "../lib/prisma";

async function main() {
  const result: Array<object> = [];
  try {
    result.push(await prisma.store.findMany());
    console.log(result);
  } catch {
    result.push({ name: "Error 500" });
  }
  return result;
}

async function getAll() {
  let res = [];
  res.push(
    main()
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
      }),
  );
  return res;
}

export { getAll };

getAll();
