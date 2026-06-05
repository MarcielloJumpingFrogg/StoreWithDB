import { prisma } from "../lib/prisma";

async function main() {
  const items = [
    {
      name: "Silent Pink Switch",
      price_cents: 10,
      producer: "generic",
      amount: 120,
      category: ["Silent", "RX cherry"],
      reviews: {
        create: {
          user: "Paolo",
          starRating: 4,
          fullReview: "Liked it, very silent",
        },
      },
    },
    {
      name: "Kahil clicky green switches",
      price_cents: 20,
      producer: "Kahil",
      category: "['Clicky', 'RX Cherry']",
      amount: 80,
      reviews: {
        create: {
          user: "Gino",
          starRating: 5,
          fullReview: "Amazing, My favorites",
        },
      },
    },
  ];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const result = await prisma.store.create({ data: item });
    console.log(result);
  }
}

async function initialize() {
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
}

initialize();
export { initialize };
