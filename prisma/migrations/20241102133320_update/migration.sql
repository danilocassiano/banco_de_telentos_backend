/*
  Warnings:

  - You are about to drop the column `curriculum` on the `Profissional` table. All the data in the column will be lost.
  - You are about to drop the column `habilidades` on the `Profissional` table. All the data in the column will be lost.
  - Added the required column `codigo` to the `Profissional` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `grauAcademico` on the `Profissional` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EGrauAcademico" AS ENUM ('BACHARELADO', 'LICENCIATURA', 'TECNOLOGO', 'ESPECIALIZACAO', 'MBA', 'MESTRADO', 'DOUTORADO', 'POS_DOUTORADO', 'ENSINO_MEDIO', 'ENSINO_FUNDAMENTAL');

-- AlterTable
ALTER TABLE "Profissional" DROP COLUMN "curriculum",
DROP COLUMN "habilidades",
ADD COLUMN     "codigo" TEXT NOT NULL,
DROP COLUMN "grauAcademico",
ADD COLUMN     "grauAcademico" "EGrauAcademico" NOT NULL;

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "blob" BYTEA NOT NULL,
    "nome" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "profissionalId" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habilidade" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Habilidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HabilidadeToProfissional" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HabilidadeToProfissional_AB_unique" ON "_HabilidadeToProfissional"("A", "B");

-- CreateIndex
CREATE INDEX "_HabilidadeToProfissional_B_index" ON "_HabilidadeToProfissional"("B");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HabilidadeToProfissional" ADD CONSTRAINT "_HabilidadeToProfissional_A_fkey" FOREIGN KEY ("A") REFERENCES "Habilidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HabilidadeToProfissional" ADD CONSTRAINT "_HabilidadeToProfissional_B_fkey" FOREIGN KEY ("B") REFERENCES "Profissional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
