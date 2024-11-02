/*
  Warnings:

  - You are about to drop the column `setorId` on the `User` table. All the data in the column will be lost.
  - Added the required column `setorId` to the `Profissional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamentoId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_setorId_fkey";

-- AlterTable
ALTER TABLE "Profissional" ADD COLUMN     "setorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "setorId",
ADD COLUMN     "departamentoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Departamento" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "abreviacao" TEXT NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_descricao_key" ON "Departamento"("descricao");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profissional" ADD CONSTRAINT "Profissional_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
