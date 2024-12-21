import { getSectors, getSectorsPages } from "@/app/api/sectors/sectors";
import { DataTable } from "../ui/data-table";
import { columns } from "../ui/columns";

export default async function ListSectors(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getSectorsPages(query);

  const data = await getSectors(query, currentPage);

  console.log(data);


  return (
    <div className="container mx-auto ">
      <div className=" p-4 mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
