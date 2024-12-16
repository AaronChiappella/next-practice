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
