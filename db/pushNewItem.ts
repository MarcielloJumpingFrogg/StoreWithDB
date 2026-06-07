import { prisma } from "../lib/prisma";

interface newItem {
  name: string;
  price_cents: number;
  producer: string;
  categories: Array<string>;
  amount: number;
  review: Array<object>;
}

async function main(item: newItem) {
  const result = await prisma.store.create({ data: item });
  console.log(result);
}

async function pushNewItem(newItem: newItem) {
  main(newItem)
    .then(async () => {
      prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      prisma.$disconnect();
      return e;
    })
    .finally(async () => {
      return 0;
    });
}

export { pushNewItem };
