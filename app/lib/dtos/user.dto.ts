// dtos/user.dto.ts

export interface CreateUserDto {
    name: string;
    surname: string;
    address: string;
    email: string;
    phoneNumber: string;
    role: "ADMIN" | "USER" | "MANAGER" | "WORKER";
    hashedPassword: string;
    profilePictureUrl?: string | null;
    profilePictureThumbnailUrl?: string | null;
  }
  
  export interface UpdateUserDto {
    name?: string;
    surname?: string;
    address?: string;
    email?: string;
    phoneNumber?: string;
    role?: "ADMIN" | "USER" | "MANAGER" | "WORKER";
    profilePictureUrl?: string | null;
    profilePictureThumbnailUrl?: string | null;
  }
  
  export interface UserResponseDto {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: string;
    profilePictureUrl?: string | null;
    profilePictureThumbnailUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  