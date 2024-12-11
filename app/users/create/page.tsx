import { CreateUserForm } from "../ui/create-form";

export default function CreateUser() {
  return (
    <div className="container mx-auto py-10">
      <p className="text-xl text-center font-semibold text-gray-800 m-4">
        Welcome to users page
      </p>

      <div className="w-3/4 mx-auto">
        <CreateUserForm />
      </div>
    </div>
  );
}
