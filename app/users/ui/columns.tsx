"use client";

import "./columns.css";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { User } from "@/app/lib/definitions";


import { format } from "date-fns";



import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react"


import { deleteUser, restoreUser, softDeleteUser } from "@/app/api/users/actions";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
   
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "profilePictureThumbnailUrl",
    header: "Profile Picture",
    cell: ({ row }) => (
      <div
        className={`flex items-center ${
          row.original.deletedAt ? "opacity-50" : ""
        }`}
      >
        <div className="relative w-8 h-8 mr-4">
          <img
            src={row.original.profilePictureThumbnailUrl}
            alt={row.original.name}
            className="rounded-full object-cover"
            style={{
              width: '32px',
              height: '32px',
              maxWidth: '32px',   // Maximum width
              maxHeight: '32px',  // Maximum height
            }}
          />
        </div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className={row.original.deletedAt ? "text-gray-400" : ""}>
        {row.original.email}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className={row.original.deletedAt ? "text-gray-400" : ""}>
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "surname",
    header: "Surname",
    cell: ({ row }) => (
      <span className={row.original.deletedAt ? "text-gray-400" : ""}>
        {row.original.surname}
      </span>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <span className={row.original.deletedAt ? "text-gray-400" : ""}>
        {row.original.phoneNumber}
      </span>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <span className={row.original.deletedAt ? "text-gray-400" : ""}>
        {row.original.address}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const rawDate = row.original.createdAt;
      const formattedDate = format(new Date(rawDate), "dd/MM/yyyy");
      return (
        <span className={row.original.deletedAt ? "text-gray-400" : ""}>
          {formattedDate}
        </span>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className={row.original.deletedAt ? "text-gray-400" : ""}>
        {row.original.role}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`h-8 w-8 p-0 ${
                user.deletedAt ? "opacity-50 " : ""
              }`}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              Copy email
            </DropdownMenuItem>
            {user.deletedAt && (
              <DropdownMenuItem
                onClick={async () => await restoreUser(user.id)}
              >
                RESTORE Customer
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => await softDeleteUser(user.id)}
            >
              SOFT Delete Customer
            </DropdownMenuItem>


            <DropdownMenuItem
              onClick={async () => await deleteUser(user.id)}
            >
              HARD Delete Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

