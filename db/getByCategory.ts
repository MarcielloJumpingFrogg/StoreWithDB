import { prisma } from "../lib/prisma"

async function getByCategory(category: String) {
  const itemInCategory = await prisma.store.findMany({
    where: { categories: { has: category } }
  })
  prisma.$disconnect()
  console.log(itemInCategory)
  return itemInCategory
}

export { getByCategory }

getByCategory("silent")

