import {getUserById, getUsers} from "@/app/api/users/users";
import EditCustomerForm from "@/app/users/ui/edit-form";
import { notFound } from "next/navigation";

export default async function Page(props:{params: Promise<{id: string}>}) {
    const params = await props.params;
    const id = parseInt(params.id) ;
    const [customer] = await Promise.all([
        getUserById(id)
    ])

    if(!customer) {
        notFound();
    }

    return (
        <>
            <main>
                
                <EditCustomerForm customer={customer} />
            </main>
        </>



    )


}