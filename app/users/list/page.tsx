import { getUsers, getUsersPages } from "@/app/api/users/users";
import { columns } from "../ui/columns";
import { DataTable } from "../ui/data-table";
import {User} from "@/app/lib/definitions";


export default async function ListUsers(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
} ) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getUsersPages(query);

  const data = await getUsers(query, currentPage); 
  


  console.log(data);
  


  return (
    <div className="container mx-auto py-10">
      <p className="text-xl text-center font-semibold text-gray-800 m-4">
        List users
      </p>

      <div className=" p-4 mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
