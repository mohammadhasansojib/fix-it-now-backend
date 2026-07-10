/*
  Warnings:

  - You are about to drop the column `booking_date` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `star` on the `reviews` table. All the data in the column will be lost.
  - Changed the type of `start_time` on the `bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_time` on the `bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `rating` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration_minutes` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "availability_slots" ALTER COLUMN "start_time" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "end_time" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "booking_date",
DROP COLUMN "start_time",
ADD COLUMN     "start_time" TIMESTAMPTZ(0) NOT NULL,
DROP COLUMN "end_time",
ADD COLUMN     "end_time" TIMESTAMPTZ(0) NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "note",
DROP COLUMN "star",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "rating" SMALLINT NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "duration_minutes" INTEGER NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "technician_profiles" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(0);

-- CreateIndex
CREATE INDEX "availability_slots_technician_id_day_of_week_idx" ON "availability_slots"("technician_id", "day_of_week");

-- CreateIndex
CREATE INDEX "bookings_technician_id_start_time_end_time_idx" ON "bookings"("technician_id", "start_time", "end_time");
