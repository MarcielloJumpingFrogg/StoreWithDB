import { check } from "express-validator";
import { prisma } from "../lib/prisma";
import { getAllCategories } from "./getAllCategories";
import "dotenv/config"

async function main() {
  const items = [
    {
      name: "Silent Pink Switch",
      price_cents: 10,
      producer: "generic",
      amount: 120,
      categories: ["silent", "generic", "MX cherry"],
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
      categories: [
        "MX cherry",
        "clicky",
        "kahil",
        "premium"
      ],
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

  const result = []
  let error
  try {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const createdData = await prisma.store.create({ data: item });

      result.push(createdData)
      console.log(createdData);
    }
  }
  catch (e) {
    console.error(e)
    error = {
      code: 500,
      message: 'Error initializing the store'
    }
  }
  return { result, error }
}

async function initializeCategories() {
  const categoryList = [
    {
      categoryName: "silent"
    },
    {
      categoryName: "generic"
    },
    {
      categoryName: "MX cherry"
    },
    {
      categoryName: "clicky"
    },
    {
      categoryName: "kahil"
    },
    {
      categoryName: "premium"
    },
  ]

  let result = []
  let error
  try {
    for (let i = 0; i < categoryList.length; i++) {
      const checkCategory = await prisma.categories.findMany({ where: { categoryName: categoryList[i].categoryName } })
      console.log('checkCategory: ', checkCategory.length)
      if (checkCategory.length == 0) {
        const createCategory = await prisma.categories.create({ data: categoryList[i] })
        console.log("Created categories: ", createCategory)
        result.push(createCategory)
      }
    }
  }
  catch (e) {
    console.error(e)
    error = {
      code: 500,
      message: 'Error at initialize categories'
    }
  }

}

async function initialize() {
  const createCategories = await initializeCategories()
  const resultItems = main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1)
    });
  console.log("Successfully created: ", createCategories)
  console.log('env', process.env.DATABASE_URL)
  return resultItems
}

initialize();
export { initialize };
