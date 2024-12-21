import { getUserSelector, getUsersPages } from "@/app/api/users/users";
import { CreateSectorForm } from "../ui/create-sector";
import { getSectorsPages } from "@/app/api/sectors/sectors";

export default async function CreateSector(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getUsersPages(query);


  const workers = await getUsersPages(query);

  const users = await getUserSelector();


    return (
         <div className="container mx-auto ">
          
              <div className="w-3/4 mx-auto">
                <CreateSectorForm users={users} />
              </div>
            </div>
    );
}