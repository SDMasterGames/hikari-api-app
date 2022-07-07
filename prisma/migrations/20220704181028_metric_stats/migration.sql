/*
  Warnings:

  - You are about to drop the column `metricsId` on the `StatsView` table. All the data in the column will be lost.
  - Added the required column `statsId` to the `StatsView` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StatsView" DROP CONSTRAINT "StatsView_metricsId_fkey";

-- AlterTable
ALTER TABLE "StatsView" DROP COLUMN "metricsId",
ADD COLUMN     "statsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "StatsView" ADD CONSTRAINT "StatsView_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "Stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
