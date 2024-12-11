import { columns } from "../ui/columns";
import { DataTable } from "../ui/data-table";
import {User} from "@/app/lib/definitions";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      name: "Delba",
      surname: "De Oliveira",
      email: "delba@oliveira.com",
      profilePictureTumbnailUrl:
        "https://media.istockphoto.com/id/1300845620/es/vector/icono-de-usuario-plano-aislado-sobre-fondo-blanco-s%C3%ADmbolo-de-usuario-ilustraci%C3%B3n-vectorial.jpg?s=1024x1024&w=is&k=20&c=xcdRV86D21s-vCU0cgoXbFZLECdgXrlRMJN8LzgZCi0=",
      role: "ADMIN",
    },
    {
      id: 2,
      name: "Jared",
      surname: "Palmer",
      email: "jared@palmer.com",
      profilePictureTumbnailUrl:
        "https://media.istockphoto.com/id/1300845620/es/vector/icono-de-usuario-plano-aislado-sobre-fondo-blanco-s%C3%ADmbolo-de-usuario-ilustraci%C3%B3n-vectorial.jpg?s=1024x1024&w=is&k=20&c=xcdRV86D21s-vCU0cgoXbFZLECdgXrlRMJN8LzgZCi0=",
      role: "ADMIN",
    },
    {
      id: 3,
      name: "Lee",

      surname: "Robinson",
      email: "lee@robinson.com",
      profilePictureTumbnailUrl:
        "https://media.istockphoto.com/id/1300845620/es/vector/icono-de-usuario-plano-aislado-sobre-fondo-blanco-s%C3%ADmbolo-de-usuario-ilustraci%C3%B3n-vectorial.jpg?s=1024x1024&w=is&k=20&c=xcdRV86D21s-vCU0cgoXbFZLECdgXrlRMJN8LzgZCi0=",
      role: "ADMIN",
    },
    {
      id: 4,
      name: "Tom",

      surname: "Occhino",
      email: "tom@occhino.com",
      profilePictureTumbnailUrl:
        "https://media.istockphoto.com/id/1300845620/es/vector/icono-de-usuario-plano-aislado-sobre-fondo-blanco-s%C3%ADmbolo-de-usuario-ilustraci%C3%B3n-vectorial.jpg?s=1024x1024&w=is&k=20&c=xcdRV86D21s-vCU0cgoXbFZLECdgXrlRMJN8LzgZCi0=",
      role: "ADMIN",
    },
    {
      id: 5,
      name: "Emil",

      surname: "Kowalski",
      email: "emil@kowalski.com",
      profilePictureTumbnailUrl:"https://media.istockphoto.com/id/1300845620/es/vector/icono-de-usuario-plano-aislado-sobre-fondo-blanco-s%C3%ADmbolo-de-usuario-ilustraci%C3%B3n-vectorial.jpg?s=1024x1024&w=is&k=20&c=xcdRV86D21s-vCU0cgoXbFZLECdgXrlRMJN8LzgZCi0=",
      role: "ADMIN",
    },
    // ...
  ];
}

export default async function ListUsers() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <p className="text-xl text-center font-semibold text-gray-800 m-4">
        List users
      </p>

      <div className="w-3/4 mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
