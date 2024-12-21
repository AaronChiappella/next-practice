import { getUsers, getUsersPages } from "@/app/api/users/users";
import { columns } from "../ui/columns";
import { DataTable } from "../ui/data-table";


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


  return (
    <div className="container mx-auto ">
    

      <div className=" p-4 mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
