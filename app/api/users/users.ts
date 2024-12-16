import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const ITEMS_PER_PAGE = 6;

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        phoneNumber: true,
        address: true,
        profilePictureUrl: true,
        profilePictureThumbnailUrl: true,
        deletedAt: true,
        role: true,
        createdAt: true,
      },
    });
    return user;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch user");
  }
}

export async function getUsers(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: query,
          mode: "insensitive", // Case-insensitive match (ILIKE equivalent)
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        phoneNumber: true,
        address: true,
        profilePictureThumbnailUrl: true,
        deletedAt: true,
        role: true,
        createdAt: true,
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
      orderBy: {
        id: "asc",
      },
    });

    return users;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch users");
  }
}

export async function getUsersPages(query: string) {
  try {
    const totalUsers = await prisma.user.count({
      where: {
        email: {
          contains: query,
          mode: "insensitive", // Case-insensitive match
        },
      },
    });

    const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);
    return totalPages;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch user count pages");
  }
}
