/*
  Warnings:

  - A unique constraint covering the columns `[Name]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Name]` on the table `nurses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "doctors_Name_key" ON "doctors"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "nurses_Name_key" ON "nurses"("Name");
