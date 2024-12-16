/*
  Warnings:

  - Made the column `profilePictureThumbnailUrl` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profilePictureUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profilePictureThumbnailUrl" SET NOT NULL,
ALTER COLUMN "profilePictureUrl" SET NOT NULL;
