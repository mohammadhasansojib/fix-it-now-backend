/*
  Warnings:

  - A unique constraint covering the columns `[stripe_account_id]` on the table `technician_profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "technician_profiles" ADD COLUMN     "stripe_account_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "technician_profiles_stripe_account_id_key" ON "technician_profiles"("stripe_account_id");
