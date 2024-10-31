-- AlterTable
ALTER TABLE "users" ALTER COLUMN "isVerified" DROP NOT NULL,
ALTER COLUMN "passwordToken" DROP NOT NULL,
ALTER COLUMN "passwordTokenExpirationDate" DROP NOT NULL,
ALTER COLUMN "verified" DROP NOT NULL;
