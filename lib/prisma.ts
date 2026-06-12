import { PrismaClient } from "../generated/prisma/client";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

//const connectionString =
//  process.env.NODE_ENV == "test"
//    ? `${process.env.TEST_DATABASE_URL}`
//    : `${process.env.DATABASE_URL}`;
//
//console.log("connectionString: ", connectionString)
//const adapter = new PrismaPg({ connectionString });
//const prisma = new PrismaClient({ adapter });

let prisma
function refreshPrisma() {
  const connectionString =
    process.env.NODE_ENV == "test"
      ? `${process.env.TEST_DATABASE_URL}`
      : `${process.env.DATABASE_URL}`;

  const adapter = new PrismaPg({ connectionString })
  prisma = new PrismaClient({ adapter })
}

refreshPrisma();

export { prisma, refreshPrisma };
