export type User = {
  id: number;
  name: string;
  surname: string;
  phoneNumber?: string | null;
  address?: string | null;
  profilePictureUrl: string | "";
  profilePictureThumbnailUrl: string |"";
  email: string;
  createdAt: Date;
  deletedAt?: Date | null;
  role: string;
};


export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  WORKER = "WORKER",
} 

export enum OrderState{
  CREADO = "CREADO",
  PREPARANDO = "PREPARANDO",
  PRODUCIENDO = "PRODUCIENDO",
  RETIRAR = "RETIRAR",
  FINALIZADA = "FINALIZADA"
}

export enum Voltage{
  V24 = "24V",
  V12 = "12V"
}

//para el selector de usuario
export type UserField = {
  id: number;
  name: string;
}

export type CreateSectorDto ={
  name: string;
  managerId: number
}
 

export type Sector = {
  id: number;
  name: string;
  manager: User;
  users: User[]
}
