-- CreateTable
CREATE TABLE "Store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price_cents" INTEGER NOT NULL,
    "producer" TEXT NOT NULL,
    "amount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "starRating" INTEGER NOT NULL,
    "fullReview" TEXT NOT NULL,
    CONSTRAINT "Review_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
