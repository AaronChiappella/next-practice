//handdle id select in create form for manager

import { CreateSectorDto } from "@/app/lib/definitions";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  managerId: z.string().min(1, {
    message: "You must select a manager.",
  }),
  users: z.array(z.string()).nullable(),
});

const CreateSector = FormSchema.omit({ users: true });

export async function createSector(formData: FormData) {
  const validatedFields = CreateSector.safeParse({
    name: formData.get("name"),
    managerId: parseInt(formData.get("managerId") as string), // Parse to integer
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const sectorData: CreateSectorDto = {
    name: validatedFields.data.name,
    managerId: parseInt(validatedFields.data.managerId),
  };

  console.log("Sector data in actions: ", sectorData);
  

  try {
   /* await prisma.sector.create({
        data: {
          name: sectorData.name,
          manager: { connect: { id: sectorData.managerId } },
          users: {
            connect: JSON.parse(formData.get("users") as string).map((userId: string) => ({
              id: parseInt(userId),
            })),
          },
        },
      });
*/
      
    return {
      message: "Sector created successfully",
      redirectUrl: "/sectors/list",
      revalidatePath: "/sectors/list",
    };
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to create user");
  }
}
