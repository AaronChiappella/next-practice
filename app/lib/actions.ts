"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import bcrypt from "bcrypt";

// Schema to validate form data
const FormSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name must be at least 2 characters.",
    }),
    surname: z.string().min(3, {
      message: "Surname must be at least 3 characters.",
    }),
    address: z.string().min(5, {
      message: "Address must be at least 5 characters.",
    }),
    email: z.string().email({
      message: "Please insert a valid email.",
    }),
    phoneNumber: z.string().min(9, {
      message: "Phone number must be at least 9 characters.",
    }),
    role: z.enum(["ADMIN", "USER", "MANAGER", "WORKER"], {
      required_error: "You must select a role.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    profilePictureUrl: z.string().optional(),
    profilePictureThumbnailUrl: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// Define the state type
export type State = {
  message: string | null;
  errors?: {
    name?: string[];
    surname?: string[];
    address?: string[];
    email?: string[];
    phoneNumber?: string[];
    role?: string[];
    password?: string[];
    confirmPassword?: string[];
    profilePictureUrl?: string[];
    profilePictureThumbnailUrl?: string[];
  };
};

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function createUser(prevState: State, formData: FormData) {
  // Parse and validate form data
  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    address: formData.get("address"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    role: formData.get("role"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    profilePictureUrl: formData.get("profilePictureUrl"),
    profilePictureThumbnailUrl: formData.get("profilePictureThumbnailUrl"),
  });

  // Return validation errors if any
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const {
    name,
    surname,
    address,
    email,
    phoneNumber,
    role,
    password,
    profilePictureUrl,
    profilePictureThumbnailUrl,
  } = validatedFields.data;
  const hashedPassword = password;

  console.log(hashedPassword);
  try {
    console.log(
      "Before api call: ",
      name,
      surname,
      address,
      email,
      phoneNumber,
      role,
      hashedPassword,
      profilePictureUrl,
      profilePictureThumbnailUrl
    );

    // Create user in the database
    await prisma.user.create({
      data: {
        name,
        surname,
        address,
        email,
        phoneNumber,
        role,
        hashedPassword,
        profilePictureUrl ,
        profilePictureThumbnailUrl,
      },
    });

    console.log("User created successfully DBVBBBB");
    //Revalidate and redirect
    //revalidatePath("/users");
    //redirect("/users");
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to create user");
  }
}

/*export async function updateUser(prevState: State, formData: FormData) {
    // Parse and validate form data
    const validatedFields = FormSchema.safeParse({
        id:formData.get("id"),
        email: formData.get("email"),
        name: formData.get("name"),
    });

    // Return validation errors if any
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation failed",};
        }

    const { id,email, name } = validatedFields.data;



    try {
        // Update user in the database
        await prisma.user.update({
            where: {
                id,
            },
            data: {
                email,
                name,
            },
        });

        // Revalidate and redirect
        revalidatePath("/users");
        redirect("/users");
    } catch (err) {
        console.error("Database Error:", err);
        throw new Error("Failed to update user");
    }

}


export async function deleteUser(id:number) {
    await prisma.user.delete({
        where: {
            id,
        },
    });
    revalidatePath("/users");
    redirect("/users");
}*/
