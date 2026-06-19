import { prisma } from "../lib/prisma";

async function getAllCategories() {
  let result;
  let error;

  try {
    result = await prisma.categories.findMany();
  } catch (e) {
    error = {
      code: 500,
      message: "There has been an internal server error",
    };
    console.error(e);
    console.error(error);
  } finally {
    prisma.$disconnect();
  }

  console.log(result);
  return { result, error };
}

export { getAllCategories };

getAllCategories();
