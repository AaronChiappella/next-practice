"use client";
import { useToast } from "@/hooks/use-toast";
import { revalidatePath } from "next/cache";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { Users } from "lucide-react";
import { UserField } from "@/app/lib/definitions";
import { createSector } from "@/app/api/sectors/actions";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  manager: z.string().min(1, {
    message: "You must select a manager.",
  }),
  users: z.array(z.string()).nullable(),
});

export function CreateSectorForm({ users }: { users: UserField[] }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      manager: "",
      users: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("managerId", data.manager);
      formData.append("users", JSON.stringify(data.users));      
      

      const response = await createSector(formData);

      console.log("response--->> ", response);

      if (response.redirectUrl && response.revalidatePath) {
        revalidatePath(response.revalidatePath);
        redirect(response.redirectUrl);
      }

      toast({
        title: "Sector creado con exito!",
        description: `Sector ${formData.get("name")} con exito!`,
      });
    } catch (error) {
      console.error("Error creating sector:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nombre del sector" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="manager"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Encargado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar encargado de sector" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Este sera el encargado del sector designado
              </FormDescription>
            </FormItem>
          )}
        />
        
        
          

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
