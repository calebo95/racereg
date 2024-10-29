-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isDirector" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRunner" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone" TEXT;
