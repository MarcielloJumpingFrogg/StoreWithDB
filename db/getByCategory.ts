import { prisma } from "../lib/prisma"

async function getByCategory(category: string) {
  const itemInCategory = await prisma.store.findMany({
    where: { categories: { has: category } }
  })
  prisma.$disconnect()
  return itemInCategory
}

export { getByCategory }

getByCategory("rx cherry")

