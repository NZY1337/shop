-- CreateEnum
CREATE TYPE "OrderEventStatus" AS ENUM ('PENDING', 'ACCEPTED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED');

-- AlterTable
ALTER TABLE "order_events" ADD COLUMN     "status" "OrderEventStatus" NOT NULL DEFAULT 'PENDING';
