-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price_cents" INTEGER NOT NULL,
    "producer" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "categories" TEXT[],

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "starRating" INTEGER NOT NULL,
    "fullReview" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
