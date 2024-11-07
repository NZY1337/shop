/*
  Warnings:

  - Added the required column `passwordToken` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordTokenExpirationDate` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationToken` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "passwordToken" TEXT NOT NULL,
ADD COLUMN     "passwordTokenExpirationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verificationToken" TEXT NOT NULL,
ADD COLUMN     "verified" TIMESTAMP(3) NOT NULL;
