"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import bcrypt from "bcrypt";

// Schema to validate form data
const FormSchema = z
  .object({
    id: z.number(),
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
    hashedPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    
    profilePictureUrl: z.string().optional().nullable(),
    profilePictureThumbnailUrl: z.string().optional().nullable(),
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
    profilePictureUrl?: string[] | null;
    profilePictureThumbnailUrl?: string[] | null;
  };
};

// Initialize Prisma Client
const prisma = new PrismaClient();

const CreateUser = FormSchema.omit({ id: true });

export async function createUser(prevState: State, formData: FormData) {
  console.log("IN CREATE USER FUNCTION");

  // Hash password
  const password = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(password, 10);  // Hashing the password

  // Parse and validate form data
  const validatedFields = CreateUser.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    address: formData.get("address"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    role: formData.get("role"),
    hashedPassword: hashedPassword,  // Use the hashed password
    profilePictureUrl: formData.get("profilePictureUrl"),
    profilePictureThumbnailUrl: formData.get("profilePictureThumbnailUrl"),
  });

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  // Set default image URLs if not provided


  // Log data for debugging
  console.log("Before API call:", validatedFields.data);

  const userData = validatedFields.data;


  if (userData.profilePictureUrl === "" || userData.profilePictureUrl === null) {
    userData.profilePictureUrl =
      "https://files.edgestore.dev/rppbgj9k8114auu9/publicImages/_public/0a5acbd4-fe6a-4f33-b090-e30a30d32f7c.png";
  }

  if (userData.profilePictureThumbnailUrl === "" || userData.profilePictureThumbnailUrl === null) {
    userData.profilePictureThumbnailUrl =
      "https://files.edgestore.dev/rppbgj9k8114auu9/publicImages/_public/0a5acbd4-fe6a-4f33-b090-e30a30d32f7c-thumb.png";
  }


  // Ensure all fields are valid before proceeding
  if (!userData || !userData.name || !userData.email || !userData.hashedPassword) {
    console.error("Missing required user data:", userData);
    return {
      errors: "Missing required user data",
      message: "Some required fields are missing",
    };
  }

  
  try {
    console.log("Data being sent to Prisma:", JSON.stringify(userData, null, 2));

    // Create user in the database
    await prisma.user.create({
      data: userData,  // Save the user with the hashed password
    });

    
    
    return {
      message: "!User created successfully!",
      revalidatePath: "/users/list",
      redirectUrl: "/users/list"}

  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to create user");
  }

  

}





const UpdateUser = FormSchema.omit({ id: true });
export async function updateUser(id: number, formData: FormData) {
  // Parse and validate form data
  const validatedFields = UpdateUser.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    surname: formData.get("surname"),
    address: formData.get("address"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    role: formData.get("role"),
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

  if (!formData.get("profilePictureUrl")) {
    validatedFields.data.profilePictureUrl =
      "https://files.edgestore.dev/rppbgj9k8114auu9/publicImages/_public/0a5acbd4-fe6a-4f33-b090-e30a30d32f7c.png";
  }

  if (!formData.get("profilePictureThumbnailUrl")) {
    validatedFields.data.profilePictureThumbnailUrl =
      "https://files.edgestore.dev/rppbgj9k8114auu9/publicImages/_public/0a5acbd4-fe6a-4f33-b090-e30a30d32f7c-thumb.png";
  }

  const {
    name,
    surname,
    address,
    email,
    phoneNumber,
    role,
    profilePictureUrl,
    profilePictureThumbnailUrl,
  } = validatedFields.data;

  try {
    // Update user in the database
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        surname,
        address,
        email,
        phoneNumber,
        role,
        profilePictureUrl,
        profilePictureThumbnailUrl,
      },
    });

    return {
      message: "!User created successfully!",
      revalidatePath: "/users/list",
      redirectUrl: "/users/list"}  
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
  revalidatePath("/users/list");
  redirect("/users/list");
}

export async function softDeleteUser(id: number) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
  revalidatePath("/users/list");
  redirect("/users/list");
}

export async function restoreUser(id: number) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      deletedAt: null,
    },
  });
  revalidatePath("/users/list");
  redirect("/users/list");
}