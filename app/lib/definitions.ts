export type User = {
  id: number;
  name: string;
  surname: string;
  phoneNumber?: string | null;
  address?: string | null;
  profilePictureThumbnailUrl: string;
  email: string;
  createdAt: Date;
  role: string;
};
