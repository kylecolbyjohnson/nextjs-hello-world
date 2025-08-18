-- CreateTable
CREATE TABLE "public"."NumberEntry" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NumberEntry_pkey" PRIMARY KEY ("id")
);
