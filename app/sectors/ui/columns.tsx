"use client"

import { access } from "fs"

export const columns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "manager",
        header: "Manager",
    },
    {
        accessorKey: "orders",
        header: "Ordenes",
    }
]