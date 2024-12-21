import React from "react";
import { getUsers, getUsersPages } from "@/app/api/users/users";
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
    <div className="flex flex-1 items-center justify-center">
          <p className="text-xl font-semibold text-gray-800"> Welcome to users page</p>
        </div>
  );
}
