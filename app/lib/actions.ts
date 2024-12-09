'use server';

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z, { number } from "zod";

// Schema to validate form data
const FormSchema = z.object({
    id:z.number(),
    email: z.string().email(),
    name: z.string().min(3),
});



// Define the state type
export type State = {
    message: string | null;
    errors?: {
        email?: string[];
        name?: string[];
    };
};

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function createUser(prevState: State, formData: FormData) {
    // Parse and validate form data
    const validatedFields = FormSchema.safeParse({
        email: formData.get("email"),
        name: formData.get("name"),
    });

    // Return validation errors if any
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation failed",
        };
    }

    const { email, name } = validatedFields.data;

    try {
        // Create user in the database
        await prisma.user.create({
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
        throw new Error("Failed to create user");
    }
}


export async function updateUser(prevState: State, formData: FormData) {
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
}