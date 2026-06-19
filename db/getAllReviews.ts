import { prisma } from "../lib/prisma";

async function getAllReviews() {
  const result = await prisma.review.findMany();
  console.log(result)
}

getAllReviews()
