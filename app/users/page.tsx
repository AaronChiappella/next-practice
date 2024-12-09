import React from "react";
import { getUsers, getUsersPages } from "../lib/data";
import UserTable from "../ui/customers/table";
import Pagination from "../ui/customers/pagination";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default async function page(props: {
  searchParams?: Promise<{
    query: string;
    page: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getUsersPages(query);

  // Asegúrate de que el total de páginas sea al menos 1 para evitar errores.
  if (totalPages < 1) {
    throw new Error("No hay resultados disponibles.");
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Users</h1>
      </div>
      <div className="m-4 flex items-center justify-between gap-2 md:mt-8">
        <Link
          href="/users/create"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Create Invoice</span>{" "}
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
      </div>
      <UserTable query={query} currentPage={currentPage} />
    
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
