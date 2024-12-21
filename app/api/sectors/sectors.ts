import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const ITEMS_PER_PAGE = 6;





export async function getSectorById(id: number) {
  try {
    const sector = await prisma.sector.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        manager: true,
        users: true,
      },
    });
    return sector;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch user");
  }
}

export async function getSectors(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const sectors = await prisma.sector.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive", // Case-insensitive match (ILIKE equivalent)
        },
      },
      select: {
        id: true,
        name: true,
        manager: true,
        users: true,      
    },
      skip: offset,
      take: ITEMS_PER_PAGE,
      orderBy: {
        id: "asc",
      },
    });

    return sectors;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch users");
  }
}

export async function getSectorsPages(query: string) {
  try {
    const totalSectors = await prisma.sector.count({
      where: {
        name: {
          contains: query,
          mode: "insensitive", // Case-insensitive match
        },
      },
    });

    const totalPages = Math.ceil(totalSectors / ITEMS_PER_PAGE);
    return totalPages;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch user count pages");
  }
}