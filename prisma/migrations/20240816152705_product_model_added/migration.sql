-- CreateTable
CREATE TABLE "Product" (
    "productId" TEXT NOT NULL,
    "restaurantId" INTEGER NOT NULL DEFAULT 164,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "preparationTime" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "tags" TEXT[],
    "discount" INTEGER NOT NULL,
    "ingredient" TEXT NOT NULL,
    "calories" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);
