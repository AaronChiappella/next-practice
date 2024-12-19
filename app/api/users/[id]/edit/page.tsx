import { EditUserForm } from "@/app/users/ui/edit-form";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      <EditUserForm user={user} />
    </div>
  );
}
