-- CreateTable
CREATE TABLE "Balance" (
    "id" SERIAL NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);
